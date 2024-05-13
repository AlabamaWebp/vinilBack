import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { User } from '../entities/user/user.entity';
import { UserService } from '../entities/user/user.service';

@Controller('noauth')
export class NoauthController {
    constructor(private readonly user: UserService) { }
    // @Get('getAll')
    // async findAll(): Promise<User[]> {
    //   return this.user.findAll();
    // }
    @Post('createAccount')
    async createAcc(@Body() user: User): Promise<boolean> {//Promise<string | null> 
        return this.user.create(user).then(el => !!el);
    }
    @Get('checkLogin/:login')
    async checkLogin(@Param('login') user: string): Promise<boolean> {
        return this.user.find({ login: user }).then(el => !!el);
    }
    @Get('login/:login/:pass')
    async login(@Param('login') login: string, @Param('pass') pass: string): Promise<boolean> {
        return this.user.find({ login: login, password: pass }).then(el => !!el);
    }

}
