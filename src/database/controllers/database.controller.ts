import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ProductImgService, ProductService } from '../entities/product/product.service';
import { userProductService } from '../entities/order/userProduct.service';

@Controller('database')
export class DatabaseController {
  constructor(
    // private readonly user: UserService,
    private readonly product: ProductService,
    private readonly productImg: ProductImgService,
    // private readonly product_class: ProductClassService,
    private readonly orders: userProductService,
  ) { }


  @Get('products/:sort')
  async products(@Param('sort') sort: string, @Query('login') login?: string): Promise<any[]> {
    const data = await this.product.findAll(sort, login);
    return data;
    // return data.map(elem => productsImg(elem, this.productImg));
  }
  @Get('product/:id')
  async productsId(@Param('id') id: number, @Query('login') login?: string): Promise<any> {
    return await this.product.findOne(id, login)
  }


  @Get('getOrderByStatus/:login/:status')
  async favorites(@Param('login') login: string, @Param('status') status: number): Promise<any> {
    return await this.orders.getByStatus(login, status);
  }

  @Post('createOrderByStatus') // 0 - favorite / 1 - bascet / 2 - order
  async createByStatus(@Body() data: { login: string, status: number, id: number }): Promise<any> {
    return await this.orders.createByStatus(data.login, data.status, data.id);
  }

  @Post('deleteOrderByStatus') // 0 - favorite / 1 - bascet / 2 - order
  async deleteByStatus(@Body() data: { login: string, status: number, id: number }): Promise<any> {
    return await this.orders.deleteByStatus(data.login, data.status, data.id);
  }
}
// async function productsImg(product: Product, service: ProductImgService): Promise<Product> {
//   const tmp = await service.findAll(product).then(el => {
//     product['img'] = el.map(el => el.img);
//     return product;
//   });
//   return tmp
// }