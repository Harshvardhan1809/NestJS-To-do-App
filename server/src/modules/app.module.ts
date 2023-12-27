import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user.module';
import { TaskModule } from './task.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from 'config/typeorm.config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      envFilePath: ['./../.env.example'],
    }),
    UserModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {} // dependency injection
}
