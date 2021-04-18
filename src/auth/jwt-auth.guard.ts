import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    //можно добавлять логику аутентификации здесь
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    //вывод ошибок в случае отсутствия юзера
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

}
