import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }

  findByUserId(user_id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ userId: user_id });
  }

  async create(task: Task): Promise<Task> {
    return await this.taskRepository.create(task);
  }

  async createNew(task: Task): Promise<Task | null> {
    return await this.taskRepository.manager.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
