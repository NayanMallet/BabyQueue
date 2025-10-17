import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class FallbackController {
  public async handle({ auth, response }: HttpContext) {
    const user = auth.user as User

    if (!user) {
      return response.redirect().toRoute('pages.login')
    }
    if (user.role === 'admin') {
      return response.redirect().toRoute('admin.pages.users')
    }
    // client/affiliate → on renvoie sur '/'
    return response.redirect().toRoute('pages.projects')
  }
}
