import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id!: string

  @column()
  public title!: string

  @column()
  public description?: string

  @column()
  public priority!: 'BAIXA' | 'MEDIA' | 'ALTA'

  @column()
  public status!: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA'

  @column.date()
  public dueDate!: DateTime

  @beforeCreate()
  public static assignUuid(task: Task) {
    task.id = randomUUID()
  }
}
