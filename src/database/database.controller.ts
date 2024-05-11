import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';

@Controller('database')
export class DatabaseController {
    constructor(private readonly userService: UserService) {}

    @Get('getAll')
    async findAll(): Promise<User[]> {
      return this.userService.findAll();
    }
  
    @Post('create')
    async create(@Body() user: User): Promise<any> //Promise<string | null> 
    {
      return this.userService.create(user);
    }
    @Get('get/:login')
    async find(@Param('login') user: string): Promise<boolean> {
        return this.userService.find(user);
    }
}
