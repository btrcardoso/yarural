import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
