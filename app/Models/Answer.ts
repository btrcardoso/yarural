import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public questionId: number

  @column()
  public userId: number

  @column()
  public description: string

  @column()
  public source: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
