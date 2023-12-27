import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Task } from './../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // HELPER
  dayCalculator(date: string): Date[] {
    let day: number | Date = Date.parse(date);
    let nextDay: number | Date = day + 86400 * 1000; // 1000*60*60*24
    day = new Date(day);
    nextDay = new Date(nextDay);
    return [day, nextDay];
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id: id });
  }

  findByUserId(user_id: number): Promise<Task[] | null> {
    return this.taskRepository.findBy({ userId: user_id });
  }

  // YYYY-MM-DD,
  findByUserIdDate(date: string, user_id: number): Promise<Task[] | null> {
    const days: Date[] = this.dayCalculator(date);
    return this.taskRepository.find({
      where: {
        created_at: Between(days[0], days[1]),
        userId: user_id,
      },
    });
  }

  findPrevByUserId(user_id: number): Promise<Task[] | null> {
    const date: string = new Date().toISOString().split('T')[0];
    const days: Date[] = this.dayCalculator(date);
    return this.taskRepository.find({
      where: {
        created_at: Between(days[0], days[1]),
        userId: user_id,
      },
    });
  }

  async create(task: Task): Promise<Task> {
    return await this.taskRepository.create(task);
  }

  async createNew(task: Task): Promise<Task | null> {
    return await this.taskRepository.manager.save(task);
  }

  async update(id, task: Partial<Task>): Promise<Task | null> {
    const t: Task = await this.taskRepository.findOneBy({ id: id });
    return await this.taskRepository.save({
      id: id,
      ...t,
      ...task,
    });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
