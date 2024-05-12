import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductClass, ProductImg } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly userRepository: Repository<Product>,

  ) { }

  async findAll(): Promise<Product[]> {
    return transform(this.userRepository.find({ relations: ['images'] }));
  }

  async create(user: Product): Promise<Product>  //Promise<User> 
  {
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<Product> {
    return await this.userRepository.findOne({ where: { id: id }, relations: ['images'] })
  }
}

export async function transform(product: Promise<Product[]>): Promise<any[]> {
  const tmp = await product;
  return tmp.map(el => {
    el.className = (el.className as ProductClass)?.name;
    return el
  });;
}

@Injectable()
export class ProductImgService {
  constructor(
    @InjectRepository(ProductImg)
    private readonly userRepository: Repository<ProductImg>,
  ) { }
  async findAll(pr: Product): Promise<ProductImg[]> {
    const tmp = await this.userRepository.find({ where: { product: pr.id } as any })
    return tmp
  }
  async create(user: ProductImg): Promise<ProductImg>  //Promise<User> 
  {
    return await this.userRepository.save(user);
  }
  // async findOne(id: number): Promise<ProductImg> {
  //   return await this.userRepository.findOneBy({ id: id })
  // }
}
