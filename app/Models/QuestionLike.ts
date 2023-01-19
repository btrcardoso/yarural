import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Question from './Question'

export default class QuestionLike extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @belongsTo(()=>User)
  public user: BelongsTo<typeof User>

  @column()
  public questionId: number

  @belongsTo(()=>Question)
  public question: BelongsTo<typeof Question>

  @column()
  public value: 1 | -1

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
