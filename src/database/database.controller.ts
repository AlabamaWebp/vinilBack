import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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


  @Get('products')
  async products(@Param('login') user: string): Promise<any> {
    return (await this.product.findAll()).map(el => {
      el.className = (el.className as ProductClass).name;
      return el
    });
  }
  @Get('products/:id')
  async productsId(@Param('id') id: number): Promise<any> {
    return this.product.find(id);
  }

}
