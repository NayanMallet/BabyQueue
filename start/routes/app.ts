// routes/app.ts
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const LeaderboardController = () => import('#controllers/leaderboard_controller')
const ProfileController = () => import('#controllers/profile_controller')
const UsersController = () => import('#controllers/users_controller')

// guest routes
router.group(() => {
  router.get('login', [UsersController, 'renderLogin']).as('pages.login')
  router.post('login', [UsersController, 'login']).as('auth.login')

  router.get('register', [UsersController, 'renderRegister']).as('pages.register')
  router.post('register', [UsersController, 'register']).as('auth.register')

  router.post('logout', [UsersController, 'logout']).as('auth.logout')

  router.get('leaderboard', [LeaderboardController, 'render']).as('pages.leaderboard')
})

// protected routes
router
  .group(() => {
    router.get('profile', [ProfileController, 'render']).as('pages.profile')
  })
  .middleware([middleware.tokenFromCookie(), middleware.auth({ guards: ['api'] })])
