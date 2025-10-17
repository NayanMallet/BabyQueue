import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, beforeSave } from '@adonisjs/lucid/orm'
import { type HasMany, type BelongsTo } from '@adonisjs/lucid/types/relations'
import { GameColorsEnum } from '../enums/game_colors_enum.js'
import { GameStatusEnum } from '../enums/game_status_enum.js'
import Table from '#models/table'
import Player from '#models/player'
import Queue from '#models/queue'

export default class Game extends BaseModel {
  @column({ isPrimary: true, columnName: 'game_id' })
  declare gameId: string

  @column.dateTime()
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
  declare status: GameStatusEnum

  @column()
  declare code: string

  @column({ columnName: 'table_id' })
  declare tableId: string

  @column({ columnName: 'queue_id' })
  declare queueId: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async ensureCode(game: Game) {
    // Generate a unique 4-digit code only if missing
    if (game.code) return

    const maxAttempts = 20
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const candidate = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')

      const exists = await Game.query().where('code', candidate).first()
      if (!exists) {
        game.code = candidate
        return
      }
    }

    throw new Error('Unable to generate a unique 4-digit game code after multiple attempts')
  }

  @hasMany(() => Player, { foreignKey: 'gameId' })
  declare players: HasMany<typeof Player>

  @belongsTo(() => Table, { foreignKey: 'tableId' })
  declare table: BelongsTo<typeof Table>

  @belongsTo(() => Queue, { foreignKey: 'queueId' })
  declare queue: BelongsTo<typeof Queue>
}
