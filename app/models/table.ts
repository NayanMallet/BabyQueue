import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Game from '#models/game'
import { type HasMany } from '@adonisjs/lucid/types/relations'

export default class Table extends BaseModel {
  @column({ isPrimary: true, columnName: 'table_id' })
  declare tableId: string

  @column()
  declare table_condition: string

  @column()
  declare location: string

  @column()
  declare ball_type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Game, { foreignKey: 'tableId' })
  declare games: HasMany<typeof Game>
}
