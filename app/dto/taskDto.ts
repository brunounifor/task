import { schema } from '@adonisjs/validator'

export const CreateTaskDTO = schema.create({
  title: schema.string(),
  description: schema.string(),
  priority: schema.enum(['BAIXA', 'MEDIA', 'ALTA'] as const),
  status: schema.enum(['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA'] as const),
  due_date: schema.date(),
})

export const UpdateTaskDTO = schema.create({
  title: schema.string.optional(),
  description: schema.string.optional(),
  priority: schema.enum.optional(['BAIXA', 'MEDIA', 'ALTA'] as const),
  status: schema.enum.optional(['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA'] as const),
  due_date: schema.date.optional(),
})
