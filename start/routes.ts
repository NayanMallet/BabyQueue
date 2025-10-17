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
router.on('/login').renderInertia('login')
router.on('/register').renderInertia('register')
router.on('/admin').renderInertia('admin')


