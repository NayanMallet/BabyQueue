import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { type HasMany, type BelongsTo } from '@adonisjs/lucid/types/relations'
import { GameColorsEnum } from '../enums/game_colors_enum.js'
import Table from '#models/table'
import Player from '#models/player'

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare gameId: string

  @column()
  declare game_date: DateTime

  @column()
  // Format "hh:mm:ss"
  declare game_duration: string

  @column()
  declare final_score_red: number

  @column()
  declare final_score_blue: number

  @column()
  declare winner: GameColorsEnum

  @column()
  declare tableId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Player, { foreignKey: 'gameId' })
  declare players: HasMany<typeof Player>

  @belongsTo(() => Table, { foreignKey: 'tableId' })
  declare table: BelongsTo<typeof Table>
}
