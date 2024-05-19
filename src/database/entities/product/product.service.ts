import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductImg } from './product.entity';
import { UserProduct } from '../userProduct/userProduct.entity';
import { User } from '../user/user.entity';
import { ProductClass } from '../productClass/productClass.entity';

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

  async findAll(sort: string | 'undefined', login?: string): Promise<(ProductNorm | Product)[]> {
    let params1 = { relations: ['images', 'className'] }
    if (sort != "undefined") {
      let productClass = await this.productClassRepository.findOne({ where: { name: sort } });
      params1['where'] = { className: productClass }
    }
    console.log(sort);
    const products = await this.productRepository.find(params1);
    if (login) {
      const userid = (await this.userRepository.findOne({ where: { login: login } }));
      const orders = (await this.orderRepository.find({ where: { user: userid }, relations: ['user', 'product'] }))
      const itog: ProductNorm[] = [];
      products.forEach(product => {
        let is_favorite = false;
        let in_basket = false;
        let in_order = false;
        orders.filter(order => product.id == order.id)
          .forEach(order => {
            switch (order.status) {
              case 0:
                is_favorite = true;
                break
              case 1:
                in_basket = true;
                break
              case 2:
                in_order = true;
                break
            }
          })
        itog.push(new ProductNorm(product, is_favorite, in_basket, in_order))
      })
      return itog
    }
    return products
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
