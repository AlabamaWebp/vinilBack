import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() user: User): Promise<string | null> {
    return await this.findAll().then((data => {
      const tmp = data.some(el => el.login == user.login);
      // if (tmp) throw new Error("Такой логин уже есть");
      if (tmp) return "Такой логин уже есть"
      else this.userService.create(user)
      return null;
    }))
    // return this.userService.create(user);
  }
}