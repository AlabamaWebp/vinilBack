import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly userRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.userRepository.find();
  }

  async create(user: Product): Promise<Product>  //Promise<User> 
  {
    return this.userRepository.save(user);
  }

}