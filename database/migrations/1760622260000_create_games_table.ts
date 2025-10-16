import { BaseSchema } from '@adonisjs/lucid/schema'
import { GameColorsEnum } from '../../app/enums/game_colors_enum.js'

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
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
