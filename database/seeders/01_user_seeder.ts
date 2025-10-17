import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Create test users with realistic names and emails
    await User.createMany([
      {
        username: 'eric_philippe',
        email: 'eric.philippe@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'alex_martin',
        email: 'alex.martin@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'marie_dubois',
        email: 'marie.dubois@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'julien_moreau',
        email: 'julien.moreau@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'sophie_bernard',
        email: 'sophie.bernard@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'thomas_petit',
        email: 'thomas.petit@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'camille_roux',
        email: 'camille.roux@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'nicolas_vincent',
        email: 'nicolas.vincent@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'laura_simon',
        email: 'laura.simon@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'antoine_garcia',
        email: 'antoine.garcia@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'chloe_david',
        email: 'chloe.david@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'maxime_richard',
        email: 'maxime.richard@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'emma_lefebvre',
        email: 'emma.lefebvre@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'lucas_michel',
        email: 'lucas.michel@ynov-toulouse.com',
        password: 'password123',
      },
      {
        username: 'lea_martinez',
        email: 'lea.martinez@ynov-toulouse.com',
        password: 'password123',
      },
    ])
  }
}
