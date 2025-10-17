import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class ProfileController {
  async render({ auth, inertia }: HttpContext) {
    const currentUser = auth.user! as User

    return inertia.render('profile', {
      currentUser: {
        userId: currentUser.userId,
        username: currentUser.username,
        email: currentUser.email,
      },
    })
  }
}
