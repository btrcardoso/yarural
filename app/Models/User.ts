import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, computed } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'
import Answer from './Answer'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public description: string | null

  @column()
  public score: number

  @column()
  public imageUrl: string

  @hasMany( () => Question)
  public questions: HasMany<typeof Question>

  @hasMany( () => Answer)
  public answers: HasMany<typeof Answer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
