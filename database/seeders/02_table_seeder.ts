import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Table from '#models/table'

export default class extends BaseSeeder {
  async run() {
    // Create test tables with realistic conditions and locations
    await Table.createMany([
      {
        tableId: 'T01',
        table_condition: 'excellent',
        location: 'Ynov Toulouse',
        ball_type: 'orange soft',
      },
      {
        tableId: 'T02',
        table_condition: 'good',
        location: 'Ynov Toulouse',
        ball_type: 'white hard',
      },
      {
        tableId: 'T03',
        table_condition: 'worn',
        location: 'Ynov Toulouse - Salle A',
        ball_type: 'orange soft',
      },
      {
        tableId: 'T04',
        table_condition: 'good',
        location: 'Ynov Toulouse - Salle B',
        ball_type: 'yellow medium',
      },
      {
        tableId: 'T05',
        table_condition: 'worn',
        location: 'Ynov Toulouse',
        ball_type: 'orange soft',
      },
      {
        tableId: 'T06',
        table_condition: 'excellent',
        location: 'Ynov Toulouse - Cafétéria',
        ball_type: 'white hard',
      },
      {
        tableId: 'T07',
        table_condition: 'good',
        location: 'Ynov Campus',
        ball_type: 'orange soft',
      },
      {
        tableId: 'T08',
        table_condition: 'worn',
        location: 'Ynov Toulouse - Hall',
        ball_type: 'yellow medium',
      },
    ])
  }
}
