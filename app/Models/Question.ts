import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'
import User from './User'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public question: string

  @column()
  public description: string | null

  @column()
  public userId: number

  @column()
  public categoryId: number | null

  @hasMany(() => Answer)
  public answers: HasMany<typeof Answer>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
