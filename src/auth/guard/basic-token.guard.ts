import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { raw } from "express";

/** 
 * 구현할 기능
 * 
 * 1) 요청객체 (request)를 불러오고
 *    authorization header로부터 토큰을 가져온다.
 * 2) authService.extractTokenFromHeader를 이용해서 사용할 수 있는 형태의 토큰을 추출한다.
 * 3) authService.decodeBasicToken을 실행해서 email과 password를 추출한다.
 * 4) email과 password를 이용해서 사용자를 가져온다.
 *    authService.authenticateWithEmailAndPassword
 * 5) 찾아낸 사용자를 (1) 요청 객체에 붙여준다.
 *      -> guard에서 미리 찾아놓은 사용자를 life cycle이 끝날 때(요청이 응답으로 나가기 직전)까지 어디서든 불러올 수 있도록
 *    req.user = user;
*/

@Injectable()
export class BasicTokenGuard implements CanActivate{
    constructor(private readonly authService: AuthService){}

    async canActivate(context: ExecutionContext): Promise <boolean> {
        // false 반환하면 guard 통과 X, true면 통과
        const req = context.switchToHttp().getRequest();

        // {authorization: 'Basic asdgadasgfds'}
        // asdgadasgfds
        const rawToken = req.headers['authorization'];

        if(!rawToken){
            throw new UnauthorizedException('토큰이 없습니당');
        }

        const token = this.authService.extractTokenFromHeader(rawToken, false);

        const {email, password} = this.authService.decodeBasicToken(token);

        const user = await this.authService.authenticateWithEmailAndPassword({
            email, 
            password,
        });

        req.user = user;

        return true;
    }
}