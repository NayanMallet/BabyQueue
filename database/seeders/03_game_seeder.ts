import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import Game from '#models/game'
import { GameColorsEnum } from '../../app/enums/game_colors_enum.js'

export default class extends BaseSeeder {
  async run() {
    // Create test games with realistic data
    await Game.createMany([
      {
        gameId: 'G000001',
        game_date: DateTime.fromISO('2024-03-15T14:30:00'),
        game_duration: '00:10:23',
        final_score_red: 5,
        final_score_blue: 3,
        winner: GameColorsEnum.RED,
        tableId: 'T01',
      },
      {
        gameId: 'G000002',
        game_date: DateTime.fromISO('2024-03-15T15:45:00'),
        game_duration: '00:08:17',
        final_score_red: 2,
        final_score_blue: 5,
        winner: GameColorsEnum.BLUE,
        tableId: 'T02',
      },
      {
        gameId: 'G000003',
        game_date: DateTime.fromISO('2024-03-16T12:15:00'),
        game_duration: '00:12:45',
        final_score_red: 5,
        final_score_blue: 4,
        winner: GameColorsEnum.RED,
        tableId: 'T03',
      },
      {
        gameId: 'G000004',
        game_date: DateTime.fromISO('2024-03-16T13:30:00'),
        game_duration: '00:07:52',
        final_score_red: 1,
        final_score_blue: 5,
        winner: GameColorsEnum.BLUE,
        tableId: 'T01',
      },
      {
        gameId: 'G000005',
        game_date: DateTime.fromISO('2024-03-17T11:20:00'),
        game_duration: '00:15:33',
        final_score_red: 5,
        final_score_blue: 5,
        winner: GameColorsEnum.RED, // Overtime win
        tableId: 'T04',
      },
      {
        gameId: 'G000006',
        game_date: DateTime.fromISO('2024-03-17T16:00:00'),
        game_duration: '00:09:28',
        final_score_red: 3,
        final_score_blue: 5,
        winner: GameColorsEnum.BLUE,
        tableId: 'T05',
      },
      {
        gameId: 'G000007',
        game_date: DateTime.fromISO('2024-03-18T10:45:00'),
        game_duration: '00:11:15',
        final_score_red: 5,
        final_score_blue: 2,
        winner: GameColorsEnum.RED,
        tableId: 'T02',
      },
      {
        gameId: 'G000008',
        game_date: DateTime.fromISO('2024-03-18T14:20:00'),
        game_duration: '00:06:44',
        final_score_red: 0,
        final_score_blue: 5,
        winner: GameColorsEnum.BLUE,
        tableId: 'T06',
      },
      {
        gameId: 'G000009',
        game_date: DateTime.fromISO('2024-03-19T15:30:00'),
        game_duration: '00:13:22',
        final_score_red: 5,
        final_score_blue: 3,
        winner: GameColorsEnum.RED,
        tableId: 'T07',
      },
      {
        gameId: 'G000010',
        game_date: DateTime.fromISO('2024-03-19T17:15:00'),
        game_duration: '00:08:56',
        final_score_red: 4,
        final_score_blue: 5,
        winner: GameColorsEnum.BLUE,
        tableId: 'T08',
      },
      {
        gameId: 'G000011',
        game_date: DateTime.fromISO('2024-03-20T12:00:00'),
        game_duration: '00:10:11',
        final_score_red: 5,
        final_score_blue: 1,
        winner: GameColorsEnum.RED,
        tableId: 'T03',
      },
      {
        gameId: 'G000012',
        game_date: DateTime.fromISO('2024-03-20T13:45:00'),
        game_duration: '00:14:07',
        final_score_red: 2,
        final_score_blue: 5,
        winner: GameColorsEnum.BLUE,
        tableId: 'T01',
      },
    ])
  }
}
