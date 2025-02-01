import TaskRepository from '../repository/taskRepository.js'

export default class TaskService {
  private taskRepository: TaskRepository

  constructor() {
    this.taskRepository = new TaskRepository()
  }

  async createTask(data: any) {
    return await this.taskRepository.create(data)
  }

  async getAllTasks() {
    return await this.taskRepository.findAll()
  }

  async getTaskById(id: string) {
    return await this.taskRepository.findById(id)
  }

  async updateTask(id: string, data: any) {
    return await this.taskRepository.update(id, data)
  }

  async deleteTask(id: string) {
    return await this.taskRepository.delete(id)
  }
}
