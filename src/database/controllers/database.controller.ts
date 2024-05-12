import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from '../entities/user/user.service';
import { User } from '../entities/user/user.entity';
import { ProductImgService, ProductService } from '../entities/product/product.service';
import { ProductClassService } from '../entities/productClass/productClass.service';
import { userProductService } from '../entities/order/userProduct.service';
import { ProductClass } from '../entities/productClass/productClass.entity';
import { Product } from '../entities/product/product.entity';

@Controller('database')
export class DatabaseController {
  constructor(
    // private readonly user: UserService,
    private readonly product: ProductService,
    private readonly productImg: ProductImgService,
    // private readonly product_class: ProductClassService,
    private readonly user_product: userProductService,
  ) { }


  @Get('products/:login')
  async products(@Param('login') login: string): Promise<any[]> {
    const data = await this.product.findAll();
    return data
    // return data.map(elem => productsImg(elem, this.productImg));
  }
  @Get('products/:login/:id')
  async productsId(@Param('login') login: string, @Param('id') id: number): Promise<any> {
    return await this.product.findOne(id)
    // .then(async el => {
    //   return await productsImg((el), this.productImg)
    // });
  }


  @Get('getOrderByStatus/:login/:status')
  async favorites(@Param('login') login: string, @Param('status') status: number): Promise<any> {
    return await this.user_product.getByStatus(login, status);
  }

  @Post('createOrderByStatus/') // 0 - favorite / 1 - bascet / 2 - order
  async createByStatus(@Body('login') data: { login: string, status: number, id: number }): Promise<any> {
    return await this.user_product.createByStatus(data.login, data.status, data.id);
  }

  @Delete('deleteOrderByStatus/:id') // 0 - favorite / 1 - bascet / 2 - order
  async deleteByStatus(@Param('id') id: number): Promise<any> {
    return await this.user_product.deleteByStatus(id);
  }
}
// async function productsImg(product: Product, service: ProductImgService): Promise<Product> {
//   const tmp = await service.findAll(product).then(el => {
//     product['img'] = el.map(el => el.img);
//     return product;
//   });
//   return tmp
// }