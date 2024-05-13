import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductClass, ProductImg } from './product.entity';
import { UserProduct } from '../order/userProduct.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductClass)
    private readonly productClassRepository: Repository<ProductClass>,
    @InjectRepository(UserProduct)
    private readonly orderRepository: Repository<UserProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(sort: string, login?: string): Promise<Product[]> {
    const productClass = await this.productClassRepository.findOne({ where: { name: sort } });
    const params = login ? { className: productClass, login: login } : { className: productClass }
    return this.productRepository.find({ where: params, relations: ['images', 'className'] });
  }
  async findOne(id: number, login?: string): Promise<(ProductNorm | Product)> {
    const product: Product = await this.productRepository.findOne({ where: { id: id }, relations: ['images', 'className'] });
    if (login) {
      const userid = (await this.userRepository.findOne({ where: { login: login } }));
      const stuses = (await this.orderRepository.find({ where: { user: userid, product: product }, relations: ['user', 'product'] })).map(el => el.status)
      const is_favorite = stuses.includes(0);
      const in_basket = stuses.includes(1);
      const in_order = stuses.includes(2);
      return new ProductNorm(product, is_favorite, in_basket, in_order)
    }
    return product
  }
  async create(user: Product): Promise<Product> { //Promise<User> 
    return this.productRepository.save(user);
  }
}
export class ProductNorm extends Product {
  constructor(
    { ...all }: Product,
    public is_favorite: boolean,
    public in_basket: boolean,
    public in_order: boolean
  ) {
    super();
    Object.assign(this, all); // Копируем остальные свойства
  }
  // is_favorite: boolean
  // in_bascket: boolean
  // in_order: boolean
}

@Injectable()
export class ProductImgService {
  constructor(
    @InjectRepository(ProductImg)
    private readonly userRepository: Repository<ProductImg>,
  ) { }
  async findAll(pr: Product): Promise<ProductImg[]> {
    const tmp = await this.userRepository.find({ where: { product: pr.id } })
    return tmp
  }
  async create(user: ProductImg): Promise<ProductImg>  //Promise<User> 
  {
    return await this.userRepository.save(user);
  }
}
