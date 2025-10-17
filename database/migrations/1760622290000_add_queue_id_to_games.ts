import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'games'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('queue_id').nullable()
      table
        .foreign('queue_id')
        .references('queues.queue_id')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')

      table.index(['queue_id'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex(['queue_id'])
      table.dropForeign(['queue_id'])
      table.dropColumn('queue_id')
    })
  }
}
