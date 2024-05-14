import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProduct } from './userProduct.entity';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';

@Injectable()
export class userProductService {
  constructor(
    @InjectRepository(UserProduct)
    private readonly orderRepository: Repository<UserProduct>,
    private readonly user: UserService,
    private readonly product: ProductService,
  ) { }

  async getByStatus(login: string, status: number): Promise<UserProduct[]> { // 0 - favorite / 1 - bascet / 2 - order
    const tmp = await this.user.find({ login: login });
    if (!tmp) throw new HttpException('Такого пользователя не существует.', HttpStatus.NOT_FOUND);
    return this.orderRepository.find({ where: { user: tmp, status: status } });
  }

  async createByStatus(login: string, status: number, id: number): Promise<any> { // 0 - favorite / 1 - bascet / 2 - order
    console.log("save");
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

  async create(user: UserProduct): Promise<UserProduct>  //Promise<User> 
  {
    return this.orderRepository.save(user);
  }

}