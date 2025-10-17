import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'queues'

  async up() {
    // Drop the table if it already exists to handle failed migration attempts
    this.schema.dropTableIfExists(this.tableName)

    this.schema.createTable(this.tableName, (table) => {
      table.string('queue_id').primary()

      table.string('table_id').notNullable()
      table
        .foreign('table_id')
        .references('tables.table_id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.index(['table_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
