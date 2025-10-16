/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('play')
router.on('/leaderboard').renderInertia('leaderboard')
router.on('/profile').renderInertia('profile')


