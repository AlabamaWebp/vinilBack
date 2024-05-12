import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductClass } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly userRepository: Repository<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    return transform(this.userRepository.find());
  }

  async create(user: Product): Promise<Product>  //Promise<User> 
  {
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<Product> {
    return await this.userRepository.findOneBy({ id: id })
  }

}

export async function transform(product: Promise<Product[]>): Promise<Product[]> {
  const tmp = (await product).map(el => {
    el.className = (el.className as ProductClass).name;
    return el
  });
  return tmp;
}