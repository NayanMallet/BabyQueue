import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UsersController = () => import('#controllers/users_controller')

router.group(() => {
  router.get('login', [UsersController, 'renderLogin']).as('pages.login')
  router.post('login', [UsersController, 'login']).as('auth.login')
  router.post('logout', [UsersController, 'logout']).as('auth.logout')
})

router
  .get('/me', async ({ auth }) => auth.user)
  .use([middleware.tokenFromCookie(), middleware.auth({ guards: ['api'] })])
