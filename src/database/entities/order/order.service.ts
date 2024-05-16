import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderProduct } from './order.entity';
import { UserProduct } from '../userProduct/userProduct.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async findAll(login?: string): Promise<any> {
    const user = await this.getLogin(login);
    return await this.orderRepository.find({where: { user: user }})
  }
  async findOne(id: number, login?: string): Promise<any> {
    return
  }
  async createOrder(data: { id: number[], login: string }): Promise<Order> { //Promise<User> 
    const user = await this.getLogin(data.login);
    let products:  Product[] = []
    const order: any = this.orderRepository.save({ user: user });
    data.id.forEach(async el => {
      const tmp = await this.productRepository.findOne({ where: { id: el }})
      this.orderProductRepository.save({ product: tmp, order: order })
      // products.push(tmp)
    })
    return order
  }

  async getLogin(login: string) {
    return (await this.userRepository.findOne({ where: { login: login } }));
  }
}