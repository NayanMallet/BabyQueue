import Database from '@adonisjs/lucid/services/db'
import logger from '@adonisjs/core/services/logger'
import User from '#models/user'
import type { Authenticators } from '@adonisjs/auth/types'
type ApiGuard = Authenticators['api']['client']

export class UserService {
  /**
   * Attempts to authenticate a user with the given email and password.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<User>} - The authenticated user.
   */
  async attempt(email: string, password: string): Promise<User> {
    try {
      const user = await User.verifyCredentials(email, password)
      logger.info(`User login successful: ${user.userId}`)
      return user
    } catch (error) {
      logger.warn(`Login attempt failed for email: ${email}`)
      throw error
    }
  }

  /**
   * Registers a new user with the provided data.
   * @param {Partial<User>} data - The user data to register.
   * @returns {Promise<User>} - The registered user.
   */
  async register(data: Partial<User>): Promise<User> {
    const trx = await Database.transaction()

    try {
      const user = await User.create(data, { client: trx })

      await trx.commit()
      logger.info(`User registered successfully: ${user.userId}`)
      return user
    } catch (error) {
      await trx.rollback()
      logger.error('User registration failed:', {
        email: data.email,
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Updates the user's profile with the provided data.
   * @param {User} user - The user to update.
   * @param {Object} data - The profile data to update.
   */
  async updateProfile(user: User, data: Partial<User>): Promise<void> {
    const trx = await Database.transaction()

    try {
      user.merge(data)
      await user.save()

      await trx.commit()
      logger.info(`User profile updated successfully: ${user.userId}`)
    } catch (error) {
      await trx.rollback()
      logger.error('Failed to update user profile:', {
        userId: user.userId,
        error: error.message,
      })
      throw error
    }
  }

  /**
   * Logs out the user by revoking their API token.
   * @param api - The API guard instance.
   */
  async logout(api: ApiGuard) {
    await api.revoke() // révoque le token courant en DB
  }
}
