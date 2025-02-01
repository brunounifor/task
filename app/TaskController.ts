import { HttpContext } from '@adonisjs/core/http'
import TaskService from './service/taskService.js'
import { CreateTaskDTO, UpdateTaskDTO } from './dto/taskDto.js'
// import TaskService from '#app/service/taskService'
// import { CreateTaskDTO, UpdateTaskDTO } from '#app/dto/taskDto'

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API de gerenciamento de tarefas
 */
export default class TaskController {
  private taskService: TaskService

  constructor() {
    this.taskService = new TaskService()
  }

  /**
   * @swagger
   * /api/tasks:
   *   post:
   *     summary: Criar uma nova tarefa
   *     tags: [Tasks]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - description
   *               - priority
   *               - status
   *               - due_date
   *             properties:
   *               title:
   *                 type: string
   *                 example: "Finalizar o projeto"
   *               description:
   *                 type: string
   *                 example: "Implementar a API de tasks"
   *               priority:
   *                 type: string
   *                 enum: ["BAIXA", "MEDIA", "ALTA"]
   *                 example: "ALTA"
   *               status:
   *                 type: string
   *                 enum: ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA"]
   *                 example: "PENDENTE"
   *               due_date:
   *                 type: string
   *                 format: date
   *                 example: "2025-02-10"
   *     responses:
   *       201:
   *         description: Tarefa criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   example: "550e8400-e29b-41d4-a716-446655440000"
   *                 title:
   *                   type: string
   *                   example: "Finalizar o projeto"
   *                 description:
   *                   type: string
   *                   example: "Implementar a API de tasks"
   *                 priority:
   *                   type: string
   *                   example: "ALTA"
   *                 status:
   *                   type: string
   *                   example: "PENDENTE"
   *                 due_date:
   *                   type: string
   *                   format: date
   *                   example: "2025-02-10"
   *       400:
   *         description: Erro de validação
   */

  public async create({ request, response }: HttpContext) {
    const payload = await request.validate({ schema: CreateTaskDTO })
    const task = await this.taskService.createTask(payload)
    return response.created(task)
  }

  /**
   * @swagger
   * /api/tasks:
   *   get:
   *     summary: Retorna todas as tarefas
   *     tags: [Tasks]
   *     responses:
   *       200:
   *         description: Lista de tarefas
   */
  public async getAll({ response }: HttpContext) {
    const tasks = await this.taskService.getAllTasks()
    return response.ok(tasks)
  }

  /**
   * @swagger
   * /api/tasks/{id}:
   *   get:
   *     summary: Retorna uma tarefa pelo ID
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID da tarefa
   *     responses:
   *       200:
   *         description: Detalhes da tarefa
   *       404:
   *         description: Tarefa não encontrada
   */
  public async getById({ params, response }: HttpContext) {
    const task = await this.taskService.getTaskById(params.id)
    if (!task) return response.notFound({ message: 'Task não encontrada' })
    return response.ok(task)
  }

  /**
   * @swagger
   * /api/tasks/{id}:
   *   put:
   *     summary: Atualiza uma tarefa pelo ID
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID da tarefa
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateTask'
   *     responses:
   *       200:
   *         description: Tarefa atualizada com sucesso
   *       404:
   *         description: Tarefa não encontrada
   */
  public async update({ params, request, response }: HttpContext) {
    const payload = await request.validate({ schema: UpdateTaskDTO })
    const task = await this.taskService.updateTask(params.id, payload)
    if (!task) return response.notFound({ message: 'Task não encontrada' })
    return response.ok(task)
  }

  /**
   * @swagger
   * /api/tasks/{id}:
   *   delete:
   *     summary: Remove uma tarefa pelo ID
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID da tarefa
   *     responses:
   *       200:
   *         description: Tarefa removida com sucesso
   *       404:
   *         description: Tarefa não encontrada
   */
  public async delete({ params, response }: HttpContext) {
    const task = await this.taskService.deleteTask(params.id)
    if (!task) return response.notFound({ message: 'Task não encontrada' })
    return response.ok({ message: 'Task removida com sucesso' })
  }

  /**
   * @swagger
   * components:
   *   schemas:
   *     CreateTask:
   *       type: object
   *       required:
   *         - title
   *         - description
   *         - priority
   *         - status
   *         - due_date
   *       properties:
   *         title:
   *           type: string
   *           example: "Finalizar o projeto"
   *         description:
   *           type: string
   *           example: "Implementar a API de tasks"
   *         priority:
   *           type: string
   *           enum: ["BAIXA", "MEDIA", "ALTA"]
   *           example: "ALTA"
   *         status:
   *           type: string
   *           enum: ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA"]
   *           example: "PENDENTE"
   *         due_date:
   *           type: string
   *           format: date
   *           example: "2025-02-10"
   *     UpdateTask:
   *       type: object
   *       properties:
   *         title:
   *           type: string
   *           example: "Atualizar o título"
   *         description:
   *           type: string
   *           example: "Nova descrição"
   *         priority:
   *           type: string
   *           enum: ["BAIXA", "MEDIA", "ALTA"]
   *           example: "MEDIA"
   *         status:
   *           type: string
   *           enum: ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA"]
   *           example: "CONCLUIDA"
   *         due_date:
   *           type: string
   *           format: date
   *           example: "2025-02-20"
   */
}
