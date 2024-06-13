import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProduct } from './userProduct.entity';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class userProductService {
  constructor(
    @InjectRepository(UserProduct)
    private readonly orderRepository: Repository<UserProduct>,
    private readonly user: UserService,
    private readonly product: ProductService,
  ) { }

  async getByStatus(login: string, status: number): Promise<any[]> { // 0 - favorite / 1 - bascet / 2 - order
    const tmp = await this.user.find({ login: login });
    if (!tmp) throw new HttpException('Такого пользователя не существует.', HttpStatus.NOT_FOUND);
    let orders: any = await this.orderRepository.find({ where: { user: tmp, status: status } });

    orders = orders.map(el => el.product.id)
    const ret = await this.product.findAll("undefined", login)
    return ret.filter(el => orders.includes(el.id))
  }

  async createByStatus(login: string, status: number, id: number): Promise<any> { // 0 - favorite / 1 - bascet / 2 - order
    const user1 = await this.user.find({ login: login });
    const product1 = await this.product.findOne(id);
    // if (!user1) throw new HttpException('Такого пользователя не существует.', HttpStatus.NOT_FOUND);
    // if (!product1) throw new HttpException('Такого продукта не существует.', HttpStatus.NOT_FOUND);
    return await this.orderRepository.save({
      user: user1,
      product: product1,
      status: status
    });
  }

  async deleteByStatus(login: string, status: number, id: number): Promise<any> { // 0 - favorite / 1 - bascet / 2 - order
    const user1 = await this.user.find({ login: login });
    const product1 = await this.product.findOne(id);
    if (!user1) throw new HttpException('Такого пользователя не существует.', HttpStatus.NOT_FOUND);
    if (!product1) throw new HttpException('Такого продукта не существует.', HttpStatus.NOT_FOUND);
    const orders = await this.orderRepository.find({
      where: {
        user: user1,
        product: product1,
        status: status
      }
    })
    return await this.orderRepository.remove(orders);

    // const tmp = await this.orderRepository.findBy({ id: id })
    // if (!tmp) throw new HttpException('Такогой записи не существует.', HttpStatus.NOT_FOUND);
    // return !!(await this.orderRepository.remove(tmp));
  }
  async deleteAllByStatus(user1: User, status: number): Promise<any> { // 0 - favorite / 1 - bascet / 2 - order
    if (!user1) throw new HttpException('Такого пользователя не существует.', HttpStatus.NOT_FOUND);
    const orders = await this.orderRepository.find({
      where: {
        user: user1,
        status: status
      }
    })
    return await this.orderRepository.remove(orders);
    // const tmp = await this.orderRepository.findBy({ id: id })
    // if (!tmp) throw new HttpException('Такогой записи не существует.', HttpStatus.NOT_FOUND);
    // return !!(await this.orderRepository.remove(tmp));
  }

  async create(user: UserProduct): Promise<UserProduct>  //Promise<User> 
  {
    return this.orderRepository.save(user);
  }

}