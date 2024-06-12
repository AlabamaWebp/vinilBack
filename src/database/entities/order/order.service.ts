import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderProduct } from './order.entity';
import { UserProduct } from '../userProduct/userProduct.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

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
    private readonly mailerService: MailerService,
  ) { }

  async findAll(login?: string): Promise<any> {
    const user = await this.getLogin(login);
    let orders: Product[][] | Order[] = await this.orderRepository.find({ where: { user: user }, relations: ['product', 'product.product', 'product.product.images'] })
    orders = orders.map(el => {
      //@ts-ignore
      el.product = el.product.map(e => {
        //@ts-ignore
        e.product.img = e.product.images[0].img
        return e.product;
      })
      return el
    })
    return orders;
  }
  // async findOne(id: number, login?: string): Promise<any> {
  //   return
  // }
  async createOrder(data: { id: number[], login: string, mail: string }): Promise<Order> { //Promise<User> 
    console.log(data.mail);
    this.sendConfirmMail(data.mail);
    if (data.id.length) {
      const user = await this.getLogin(data.login);
      const order: any = await this.orderRepository.save({ user: user });
      data.id.forEach(async el => {
        const tmp = await this.productRepository.findOne({ where: { id: el } })
        await this.orderProductRepository.save({ product: tmp, order: order })
        return
      })
      return order
    }
  }

  async getLogin(login: string) {
    return (await this.userRepository.findOne({ where: { login: login } }));
  }

  async sendConfirmMail(email: string) {
    // Отправка почты
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'Testing Nest MailerModule ✔',
        template: join(__dirname, '../../../mailer', 'confirmReg')
        // context: {
        //   username: user.name,
        //   urlConfirmAddress,
        // },
      })
      .catch((e) => {
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
  }
}
interface mailer {
  email: string,
  name: string,

}