import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Controller('noauth')
export class NoauthController {
    constructor(private readonly user: UserService) { }
    // @Get('getAll')
    // async findAll(): Promise<User[]> {
    //   return this.user.findAll();
    // }
    @Post('createAccount')
    async createAcc(@Body() user: User): Promise<any> //Promise<string | null> 
    {
        return this.user.create(user);
    }
    @Get('checkLogin/:login')
    async checkLogin(@Param('login') user: string): Promise<boolean> {
        return this.user.find(user);
    }

}
