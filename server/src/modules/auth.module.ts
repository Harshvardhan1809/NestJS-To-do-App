import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'jwt',
      global: true,
      signOptions: {
        expiresIn: '10800s',
      },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
