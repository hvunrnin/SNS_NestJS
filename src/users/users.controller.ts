import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { emitWarning, nextTick } from 'process';
import e from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(){
    return this.usersService.getAllUsers();
  }

  // @Post()
  // postUser(@Body('nickname') nickname: string,
  //   @Body('email') email: string,
  //   @Body('password') password: string){
  //     return this.usersService.createUser({
  //       nickname,
  //       email,
  //       password,
  //     });
  // }

}
