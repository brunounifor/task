import Task from '../entity/taskEntity.js'

export default class TaskRepository {
  async create(data: Partial<Task>) {
    return await Task.create(data)
  }

  async findAll() {
    return await Task.all()
  }

  async findById(id: string) {
    return await Task.find(id)
  }

  async update(id: string, data: Partial<Task>) {
    const task = await Task.find(id)
    if (!task) return null
    task.merge(data)
    await task.save()
    return task
  }

  async delete(id: string) {
    const task = await Task.find(id)
    if (!task) return null
    await task.delete()
    return task
  }
}
