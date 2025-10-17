import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Table from '#models/table'
import Queue from '#models/queue'
import Game from '#models/game'

export default class extends BaseSeeder {
  public static developmentOnly = true

  async run() {
    // 1) Create one queue per table (id like Q_T01)
    const tables = await Table.all()

    for (const table of tables) {
      const queueId = `Q_${table.tableId}`
      await Queue.firstOrCreate(
        { queueId },
        {
          queueId,
          tableId: table.tableId,
        }
      )
    }

    // 2) Add 3–4 existing games into queues
    // We respect the constraint that a queue belongs to a table, so we only attach games
    // to the queue of the same table.

    // Attach up to 3 games from table T01 to its queue
    const qT01 = await Queue.findBy('tableId', 'T01')
    if (qT01) {
      await Game.query()
        .whereIn('gameId', ['G000001', 'G000004', 'G000012'])
        .andWhere('tableId', 'T01')
        .update({ queueId: qT01.queueId })
    }

    // Attach 1 game from table T02 to its queue (to reach 4 in total)
    const qT02 = await Queue.findBy('tableId', 'T02')
    if (qT02) {
      await Game.query().where('gameId', 'G000002').andWhere('tableId', 'T02').update({ queueId: qT02.queueId })
    }
  }
}
