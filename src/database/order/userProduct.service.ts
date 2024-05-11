import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProduct } from './userProduct.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserProduct)
    private readonly userRepository: Repository<UserProduct>,
  ) {}

  async findAll(): Promise<UserProduct[]> {
    return this.userRepository.find();
  }

  async create(user: UserProduct): Promise<UserProduct>  //Promise<User> 
  {
    return this.userRepository.save(user);
  }

}