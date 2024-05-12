import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductClass } from '../product/product.entity';

@Injectable()
export class ProductClassService {
  constructor(
    @InjectRepository(ProductClass)
    private readonly userRepository: Repository<ProductClass>,
  ) {}

  async findAll(): Promise<ProductClass[]> {
    return this.userRepository.find();
  }

  async create(user: ProductClass): Promise<ProductClass>  //Promise<User> 
  {
    return this.userRepository.save(user);
  }

  // onModuleInit() {
  //   const classes = [
  //     "Классика",
  //     "Джаз",
  //     "Блюз",
  //     "Рок",
  //     "Поп",
  //   ]
  //   classes.forEach(el => this.create({name: el} as any))
  // }
}