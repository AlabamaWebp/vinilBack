import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { ProductService } from './product/product.service';
import { ProductClassService } from './product/productClass.service';
import { userProductService } from './order/userProduct.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly user: UserService,
    private readonly product: ProductService,
    private readonly product_class: ProductClassService,
    private readonly user_product: userProductService,
  ) { }

  // @Get('getAll')
  // async findAll(): Promise<User[]> {
  //   return this.user.findAll();
  // }

  @Post('createAccount')
  async createAcc(@Body() user: User): Promise<any> //Promise<string | null> 
  {
    return this.user.create(user);
  }
  @Get('checkLogin/:login')
  async checkLogin(@Param('login') user: string): Promise<boolean> {
    return this.user.find(user);
  }

  @Get('products')
  async products(@Param('login') user: string): Promise<any> {
    return this.product.findAll();
  }
  @Get('products/:id')
  async productsId(@Param('id') id: number): Promise<any> {
    return this.product.find(id);
  }
}
