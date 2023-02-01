import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'
import User from './User'
import Category from './Category'
import QuestionLike from './QuestionLike'

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

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @hasMany(() => QuestionLike)
  public question_likes: HasMany<typeof QuestionLike>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
