import { BaseSchema } from '@adonisjs/lucid/schema'
import { GameColorsEnum } from '../../app/enums/game_colors_enum.js'
import { GameStatusEnum } from '../../app/enums/game_status_enum.js'

export default class extends BaseSchema {
  protected tableName = 'games'

  async up() {
    // Drop the table if it already exists to handle failed migration attempts
    this.schema.dropTableIfExists(this.tableName)

    this.schema.createTable(this.tableName, (table) => {
      table.string('game_id').primary()
      table.timestamp('game_date', { useTz: true }).notNullable()
      table.string('game_duration').notNullable()
      table.integer('final_score_red').notNullable()
      table.integer('final_score_blue').notNullable()
      table.enum('winner', Object.values(GameColorsEnum)).notNullable()

      // New status and short code columns
      table.enum('status', Object.values(GameStatusEnum)).notNullable().defaultTo('wainting')
      table.string('code', 4).notNullable().unique()

      table.string('table_id').notNullable()
      table
        .foreign('table_id')
        .references('tables.table_id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.index(['table_id'])
      table.index(['winner'])
      table.index(['status'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
