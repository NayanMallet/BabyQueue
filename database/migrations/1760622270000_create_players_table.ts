import { BaseSchema } from '@adonisjs/lucid/schema'
import { GameColorsEnum } from '../../app/enums/game_colors_enum.js'
import { PlayerRoleEnum } from '../../app/enums/player_role_enum.js'

export default class extends BaseSchema {
  protected tableName = 'players'

  async up() {
    // Drop the table if it already exists to handle failed migration attempts
    this.schema.dropTableIfExists(this.tableName)

    this.schema.createTable(this.tableName, (table) => {
      table.string('player_id').primary()

      table.string('player_name').notNullable()
      table.enum('player_role', Object.values(PlayerRoleEnum)).notNullable()
      table.integer('player_goals').notNullable().defaultTo(0)
      table.integer('player_own_goals').notNullable().defaultTo(0)
      table.integer('player_assists').notNullable().defaultTo(0)
      table.integer('player_saves').notNullable().defaultTo(0)
      table.string('possession_time').notNullable()
      table.string('mood').notNullable()
      table.text('player_comment').nullable()

      table.enum('team_color', Object.values(GameColorsEnum)).notNullable()
      table.enum('is_substitute', ['yes', 'no', 'maybe']).notNullable()

      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')

      table.string('game_id').notNullable()
      table.foreign('game_id').references('games.game_id').onDelete('CASCADE').onUpdate('CASCADE')

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.index(['user_id'])
      table.index(['game_id'])
      table.index(['player_role'])
      table.index(['team_color'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
