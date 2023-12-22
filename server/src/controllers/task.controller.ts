import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Task } from 'src/entities/task.entity';
import { TaskService } from 'src/services/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  async getAll(): Promise<Task[] | string> {
    const allTasks = await this.taskService.findAll();
    if (allTasks.length == 0) return "Didn't find any tasks";
    return allTasks;
  }

  @Get(':id')
  async getById(@Param() id: number): Promise<Task | null> {
    return this.taskService.findOne(id);
  }

  @Get('user/:user_id')
  async getByUser(@Param() user_id: number): Promise<Task | null> {
    return this.taskService.findByUserId(user_id);
  }

  @Post('create')
  async create(@Body() task: Task): Promise<Task | null> {
    const newTask = await this.taskService.create(task);
    return await this.taskService.createNew(newTask);
  }
}
