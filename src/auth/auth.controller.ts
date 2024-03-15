import { Body, Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  postTokenAccess(
    @Headers('authorization') rawToken: string
  ){
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    /** 
     * {accessToken: {token}}
    */
    const newToken = this.authService.rotateToken(token, false);

    return {
      accessToken: newToken,
    }
  }

  @Post('token/refresh')
  postTokenRefresh(
    @Headers('authorization') rawToken: string
  ){
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    /** 
     * {accessToken: {token}}
    */
    const newToken = this.authService.rotateToken(token, true);

    return {
      refreshTOken: newToken,
    }
  }


  @Post('login/email')
  postLoginEmail(
    // @Body('email') email: string,
    // @Body('password') password: string,
    @Headers('authorization') rawToken: string,
  ){
    // email: password -> base64
    // ajsdklgjeakletgjwealjsl -> email:password
    const token = this.authService.extractTokenFromHeader(rawToken, false);

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  postRegisterEmail(
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ){
    return this.authService.registerWithEmail({
      nickname,
      email,
      password,
    });
  }
}
