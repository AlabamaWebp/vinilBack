import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderProduct } from './order.entity';
import { UserProduct } from '../userProduct/userProduct.entity';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { userProductService } from '../userProduct/userProduct.service';
dotenv.config();

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
    private readonly userProductS: userProductService,
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
  async createOrder(data: { id: number[], login: string, mail: string, addres: string, tel: string, sposob: string, del: boolean }): Promise<Order> { //Promise<User>

    if (data.id.length) {
      const user = await this.getLogin(data.login);
      const order: any = await this.orderRepository.save({ user: user });
      let tovar: string[] = []
      let price = 0
      for (let el of data.id) {
        const tmp = await this.productRepository.findOne({ where: { id: el } })
        tovar.push(tmp.name);
        price += tmp.price;
        await this.orderProductRepository.save({ product: tmp, order: order })
      }
      const tmp = {
        email: data.mail,
        fio: user.fio,
        tel: data.tel,
        tovar: tovar.toString(),
        addres: data.addres,
        sposob: data.sposob,
        price: price + ' рублей'
      }
      this.sendConfirmMail(tmp);
      if (data.del)
        this.userProductS.deleteAllByStatus(user, 1)
      return order
    }
  }

  async getLogin(login: string) {
    return (await this.userRepository.findOne({ where: { login: login } }));
  }

  async sendConfirmMail(data: mailer) {
    console.log(process.env.login, !!process.env.password);
    // Отправка почты
    return await this.mailerService
      .sendMail({
        to: process.env.login,
        subject: 'Оформлен заказ',
        template: join(__dirname, '../../../mailer', 'confirmReg'),
        context: {
          email: data.email,
          fio: data.fio,
          tel: data.tel,
          tovar: data.tovar,
          addres: data.addres,
          sposob: data.sposob,
          price: data.price
        },
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
  fio: string,
  tel: string,
  tovar: string,
  addres: string,
  sposob: string,
  price: string
}