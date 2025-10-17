import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().toLowerCase().email(),
    password: vine.string().trim().minLength(8).maxLength(255),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).maxLength(255),

    email: vine.string().trim().toLowerCase().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().trim().minLength(8).maxLength(255),
  })
)

export const updateUserProfileValidator = (currentEmail: string) => {
  return vine.compile(
    vine.object({
      username: vine.string().trim().minLength(3).maxLength(255).optional(),

      email: vine
        .string()
        .trim()
        .toLowerCase()
        .email()
        .unique(async (db, value) => {
          if (!value || value === currentEmail) {
            return true
          }

          const exists = await db.from('users').where('email', value).first()
          return !exists
        })
        .optional(),
    })
  )
}
