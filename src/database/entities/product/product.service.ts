import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductClass, ProductImg } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly userRepository: Repository<Product>,
    @InjectRepository(ProductClass)
    private readonly productClassRepository: Repository<ProductClass>,
  ) { }

  async findAll(sort: string): Promise<Product[]> {
    const productClass = await this.productClassRepository.findOne({ where: { name: sort } });
    return this.userRepository.find({ where: { className: productClass }, relations: ['images', 'className'] });
  }
  async create(user: Product): Promise<Product>  //Promise<User> 
  {
    return this.userRepository.save(user);
  }
  async findOne(id: number): Promise<Product> {
    return await this.userRepository.findOne({ where: { id: id }, relations: ['images', 'className']})
  }
}

// export async function transform(product: Promise<Product[]>): Promise<any[]> {
//   const tmp = await product;
//   return tmp.map(el => {
//     el.className = (el.className as ProductClass)?.name;
//     return el
//   });;
// }

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
