import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async getAll(): Promise<string | User[]> {
    const allUsers = await this.userService.findAll();
    if (allUsers.length == 0) return "Didn't find any users";
    return allUsers;
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<User | string> {
    return await this.userService.findOne(id);
  }

  @Post('create')
  async create(@Body() user: User): Promise<User | null> {
    const newUser = await this.userService.create(user);
    return await this.userService.createNew(newUser);
  }
}
