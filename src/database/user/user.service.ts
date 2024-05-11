import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // onModuleInit() {
  //   this.userRepository.save({
  //     "login": "1",
  //     "password": "1",
  //     "fio": "1",
  //     "tel": "1",
  //     "country": "1",
  //     "city": "1"
  //   })
  // }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User): Promise<string | null>  //Promise<User> 
  {
    return await this.findAll().then((data => {
      const tmp = data.some(el => el.login == user.login);
      // if (tmp) throw new Error("Такой логин уже есть");
      if (tmp) return "Такой логин уже есть"
      else this.userRepository.save(user)
      return null;
    }))
    // return this.userRepository.save(user);
  }
  async find(login: string): Promise<boolean> {
    return await this.userRepository.findOneBy({ login: login })
    .then(el => {
      return !!el;
    })
  }
}