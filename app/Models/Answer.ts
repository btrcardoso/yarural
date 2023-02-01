import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Question from './Question'
import AnswerLike from './AnswerLike'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public questionId: number

  @belongsTo(() => Question)
  public question: BelongsTo<typeof Question>

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public description: string

  @column()
  public source: string | null

  @hasMany(() => AnswerLike)
  public answer_likes: HasMany<typeof AnswerLike>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
