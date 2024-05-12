import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { ProductService } from './product/product.service';
import { ProductClassService } from './product/productClass.service';
import { userProductService } from './order/userProduct.service';
import { ProductClass } from './product/productClass.entity';

@Controller('database')
export class DatabaseController {
  constructor(
    // private readonly user: UserService,
    private readonly product: ProductService,
    // private readonly product_class: ProductClassService,
    private readonly user_product: userProductService,
  ) { }


  @Get('products/:login')
  async products(@Param('login') login: string): Promise<any> {
    return await this.product.findAll();
  }
  @Get('products/:login/:id')
  async productsId(@Param('login') login: string, @Param('id') id: number): Promise<any> {
    return this.product.findOne(id);
  }


  @Get('getOrderByStatus/:login/:status')
  async favorites(@Param('login') login: string, @Param('status') status: number): Promise<any> {
    return await this.user_product.getByStatus(login, status);
  }

  @Post('createOrderByStatus/') // 0 - favorite / 1 - bascet / 2 - order
  async createByStatus(@Body('login') data: {login: string, status: number, id: number}): Promise<any> {
    return await this.user_product.createByStatus(data.login, data.status, data.id);
  }

  @Delete('deleteOrderByStatus/:id') // 0 - favorite / 1 - bascet / 2 - order
  async deleteByStatus(@Param('id') id: number): Promise<any> {
    return await this.user_product.deleteByStatus(id);
  }

}
