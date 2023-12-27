import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/services/auth.service';
import { Response, Request } from 'express';

interface LoginRequestBody {
  username: string;
  password: string;
}

interface SignupRequestBody {
  username: string;
  password: string;
  confirmPassword: string;
}

interface LoginReturnBody {
  access_token: string;
}

interface AuthReturnBody {
  user: User;
  access_token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginRequestBody,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginReturnBody | null> {
    const resp = await this.authService.login(body.username, body.password);
    response.cookie('jwt', resp.access_token, { httpOnly: true });
    return resp;
  }

  @Post('signup')
  async signup(
    @Body() body: SignupRequestBody,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthReturnBody | null> {
    const resp = await this.authService.signup(
      body.username,
      body.password,
      body.confirmPassword,
    );
    response.cookie('jwt', resp.access_token, { httpOnly: true });
    return resp;
  }

  @Post('check_auth')
  async checkAuth(@Req() request: Request): Promise<User | null> {
    console.log(request.cookies);
    return await this.authService.checkAuth(request.cookies);
  }
}
