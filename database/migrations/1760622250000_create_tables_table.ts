import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tables'

  async up() {
    // Drop the table if it already exists to handle failed migration attempts
    this.schema.dropTableIfExists(this.tableName)

    this.schema.createTable(this.tableName, (table) => {
      table.string('table_id').primary()
      table.string('table_condition').notNullable()
      table.string('location').notNullable()
      table.string('ball_type').notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
