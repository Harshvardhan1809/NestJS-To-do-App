import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
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
  async getById(@Param('id') id: number): Promise<Task | null> {
    return this.taskService.findOne(id);
  }

  @Get('user/:user_id')
  async getByUser(@Param('user_id') user_id: number): Promise<Task[] | null> {
    return this.taskService.findByUserId(user_id);
  }

  // YYYY-MM-DD
  @Get('date/:user_id/:date')
  async getByUserIdDate(
    @Param('date') date: string,
    @Param('user_id') user_id: number,
  ): Promise<Task[] | null> {
    return this.taskService.findByUserIdDate(date, user_id);
  }

  // YYYY-MM-DD
  @Get('prev/:user_id')
  async getPrevUserId(
    @Param('user_id') user_id: number,
  ): Promise<Task[] | null> {
    return this.taskService.findPrevByUserId(user_id);
  }

  @Post('create')
  async create(@Body() task: Task): Promise<Task | null> {
    const newTask = await this.taskService.create(task);
    return await this.taskService.createNew(newTask);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() task: Partial<Task>,
  ): Promise<Task | null> {
    return await this.taskService.update(id, task);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.taskService.remove(id);
  }
}

// Select<>
