import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateTasks extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.enum('priority', ['BAIXA', 'MEDIA', 'ALTA']).notNullable()
      table.enum('status', ['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA']).notNullable()
      table.date('due_date').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
