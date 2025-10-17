// app/middleware/api_token_cookie.ts
import type { HttpContext } from '@adonisjs/core/http'

export default class ApiTokenCookie {
  public async handle({ request }: HttpContext, next: () => Promise<void>) {
    const token = request.cookie('api_token')
    if (token && !request.header('authorization')) {
      request.request.headers.authorization = `Bearer ${token}`
    }
    await next()
  }
}
