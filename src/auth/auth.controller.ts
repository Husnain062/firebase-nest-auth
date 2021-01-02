import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser, GoogleAuth } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('signup')
  signUp(@Body() user: CreateUser) {
    return this.authService.create(user);
  }

  @Post('login')
  login(@Body() user: CreateUser) {
    return this.authService.login(user);
  }

  @Post('login_facebook')
  loginFacebook(@Body() fbAccessToken: string) {
    return this.authService.loginFacebook(fbAccessToken);
  }

  @Post('login_google')
  loginGoogle(@Body() googleAuth: GoogleAuth) {
    return this.authService.loginGoogle(googleAuth);
  }

  @Get('profile')
  profile(@Headers() token: any): any {
    return this.authService.profile(token);
  }

  @Post('reset')
  reset(@Body() email: any): any {
    return this.authService.resetPassword(email);
  }

  @Get('logout')
  logout(@Headers() token: any): any {
    return this.authService.logout(token);
  }
}
