import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProduct } from './userProduct.entity';
import { ProductService, transform } from '../product/product.service';
import { UserService } from '../user/user.service';

@Injectable()
export class userProductService {
  constructor(
    @InjectRepository(UserProduct)
    private readonly userRepository: Repository<UserProduct>,
    private readonly user: UserService,
    private readonly product: ProductService,
  ) {}

  async getByStatus(login: string, status: number): Promise<UserProduct[]> { // 0 - favorite / 1 - bascet / 2 - order
    const tmp = await this.user.find(login);
    
    if (!tmp) throw new HttpException('Такого пользователя не существует.', HttpStatus.NOT_FOUND);
    return this.userRepository.findBy({
      user: tmp,
      status: status
    });
  }

  async createByStatus(login: string, status: number, id: number): Promise<boolean> { // 0 - favorite / 1 - bascet / 2 - order
    const user1 = await this.user.find(login);
    const product1 = await this.product.findOne(id);
    if (!user1) throw new HttpException('Такого пользователя не существует.', HttpStatus.NOT_FOUND);
    if (!product1) throw new HttpException('Такого продукта не существует.', HttpStatus.NOT_FOUND);
    return !!(await this.userRepository.save({
      user: user1,
      product: product1,
      status: status
    }));
  }

  async deleteByStatus(id: number): Promise<boolean> { // 0 - favorite / 1 - bascet / 2 - order
    const tmp = await this.userRepository.findOneBy({id: id})
    if (!tmp) throw new HttpException('Такогой записи не существует.', HttpStatus.NOT_FOUND);
    return !!(await this.userRepository.remove(tmp));
  }

  async create(user: UserProduct): Promise<UserProduct>  //Promise<User> 
  {
    return this.userRepository.save(user);
  }

}