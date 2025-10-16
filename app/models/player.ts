import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { PlayerRoleEnum } from '../enums/player_role_enum.js'
import { GameColorsEnum } from '../enums/game_colors_enum.js'
import Game from '#models/game'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare playerId: string

  @column()
  declare player_name: string

  @column()
  declare player_role: PlayerRoleEnum

  @column()
  declare player_goals: number

  @column()
  declare player_own_goals: number

  @column()
  declare player_assists: number

  @column()
  declare player_saves: number

  @column()
  // Format "mm:ss"
  declare possession_time: string

  @column()
  declare mood: string

  @column()
  declare player_comment: string | null

  @column()
  declare team_color: GameColorsEnum

  @column()
  declare is_substitute: 'yes' | 'no' | 'maybe'

  @column()
  declare userId: number

  @column()
  declare gameId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Game, { foreignKey: 'gameId' })
  declare game: BelongsTo<typeof Game>

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>
}
