import { User } from './../src/entities/user.entity';
import { Task } from './../src/entities/task.entity';
import { DataSourceOptions } from 'typeorm';

const typeOrmBaseConfig = {
  port: 9010,
  username: 'user',
  password: 'password',
  database: 'nest_api',
};

export const typeOrmConfig: DataSourceOptions = {
  ...typeOrmBaseConfig,
  type: 'mysql',
  migrations: [__dirname + './migrations/*{.ts,.js}'],
  entities: [User, Task],
  synchronize: true,
};
