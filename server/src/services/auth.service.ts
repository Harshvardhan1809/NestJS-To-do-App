import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';

interface AuthReturnBody {
  user: User;
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<AuthReturnBody | null> {
    const user: User = await this.userService.findByCredentials(
      username,
      password,
    );
    if (!user) throw new BadRequestException('Incorrect password. Try again');
    // JWT
    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);
    return { user: user, access_token };
  }

  async signup(
    username: string,
    password: string,
    confirmPassword: string,
  ): Promise<AuthReturnBody | null> {
    if (password === confirmPassword) {
      const exclusive: boolean =
        await this.userService.checkExclusive(username);
      if (exclusive) {
        let user = new User(username, password);
        user = await this.userService.create(user);
        user = await this.userService.createNew(user);
        // JWT
        if (user) {
          const payload = { sub: user.id, username: user.username };
          const access_token = this.jwtService.sign(payload);
          return { user, access_token };
        }
      }
    } else {
      throw new BadRequestException("Passwords don't match. Enter again");
    }
  }

  async checkAuth(cookie: any): Promise<User | null> {
    const claims = await this.jwtService.decode(cookie.jwt);
    return await this.userService.findOne(claims.sub);
  }
}
