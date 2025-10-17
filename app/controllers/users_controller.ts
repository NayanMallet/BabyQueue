// app/controllers/users_controller.ts
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import { UserService } from '#services/user_service'
import { loginValidator, registerValidator } from '#validators/user_validator'
import type { Authenticators } from '@adonisjs/auth/types'
type ApiGuard = Authenticators['api']['client']

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  // GET /login
  renderLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  // GET /register
  renderRegister({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  // POST /login
  async login({ auth, request, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    try {
      const user = await this.userService.attempt(email, password)
      const token = await (auth.use('api') as ApiGuard).createToken(user)
      const raw = token.value!.release()

      response.cookie('api_token', raw, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      logger.info(`User logged in: ${user.userId}`)
      return response.redirect('/')
    } catch (error) {
      logger.warn(`Login failed for ${email}: ${error.message}`)
      session.flash('errorsBag', {
        code: 'E_INVALID_CREDENTIALS',
        message: 'Identifiants invalides.',
      })
      return response.badRequest({ error: 'invalid_credentials' })
    }
  }

  // POST /register
  async register({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = await this.userService.register(payload) // hash fait dans le service (voir ci-dessous)
    const token = await (auth.use('api') as ApiGuard).createToken(user)
    const raw = token.value!.release()

    response.cookie('api_token', raw, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    logger.info(`New user registered: ${user.userId}`)
    return response.redirect('/')
  }

  // POST /logout
  async logout({ auth, response }: HttpContext) {
    await (auth.use('api') as ApiGuard).invalidateToken()
    response.clearCookie('api_token', { path: '/' })
    return response.redirect().toPath('/login')
  }
}
