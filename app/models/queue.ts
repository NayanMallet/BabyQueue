import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { type BelongsTo, type HasMany } from '@adonisjs/lucid/types/relations'
import Table from '#models/table'
import Game from '#models/game'

export default class Queue extends BaseModel {
  @column({ isPrimary: true, columnName: 'queue_id' })
  declare queueId: string

  @column({ columnName: 'table_id' })
  declare tableId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Table, { foreignKey: 'tableId' })
  declare table: BelongsTo<typeof Table>

  @hasMany(() => Game, { foreignKey: 'queueId' })
  declare games: HasMany<typeof Game>
}
