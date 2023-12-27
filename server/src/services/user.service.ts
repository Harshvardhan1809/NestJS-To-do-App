import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findByCredentials(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user: User = await this.userRepository.findOneBy({ username });
    const validPassword: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (validPassword) return user;
    else throw new UnauthorizedException('Invalid password. Try again');
  }

  async checkExclusive(username: string): Promise<boolean> {
    const user: User = await this.userRepository.findOneBy({ username });
    if (user) return false;
    else return true;
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async createNew(user: User): Promise<User | null> {
    return this.userRepository.manager.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
