// app/controllers/leaderboard_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'
import Player from '#models/player'

export default class LeaderboardController {
  async render({ inertia }: HttpContext) {
    const rows = await Player.query()
      .join('users', 'users.user_id', 'players.user_id')
      .join('games', 'games.game_id', 'players.game_id')
      // .where('games.status', 'finished')
      .select('users.username')
      .select(
        Database.raw('SUM(CASE WHEN players.team_color = games.winner THEN 1 ELSE 0 END) AS wins')
      )
      .groupBy('users.user_id', 'users.username')
      .orderBy('wins', 'desc')
      .pojo<{ username: string; wins: number }>()

    return inertia.render('leaderboard', {
      leaderboard: rows.map((r) => ({ username: r.username, wins: Number(r.wins || 0) })),
    })
  }
}
