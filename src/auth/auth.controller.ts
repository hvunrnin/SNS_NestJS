import { Body, Controller, Post, Headers, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MaxLengthPipe, MinLengthPipe, PasswordPipe } from './pipe/password.pipe';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { AccessTokenGuard, RefreshTokenGuard } from './guard/bearer-token.guard';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  @UseGuards(RefreshTokenGuard)
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
  @UseGuards(RefreshTokenGuard)
  postTokenRefresh(
    @Headers('authorization') rawToken: string
  ){
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    /** 
     * {accessToken: {token}}
    */
    const newToken = this.authService.rotateToken(token, true);

    return {
      refreshToken: newToken,
    }
  }


  @Post('login/email')
  @UseGuards(BasicTokenGuard)
  postLoginEmail(
    // @Body('email') email: string,
    // @Body('password') password: string,
    @Headers('authorization') rawToken: string,
    // @Request() req,
  ){
    // email: password -> base64
    // ajsdklgjeakletgjwealjsl -> email:password
    const token = this.authService.extractTokenFromHeader(rawToken, false);

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  postRegisterEmail(@Body() body: RegisterUserDto){
    return this.authService.registerWithEmail(body);
  }
}
