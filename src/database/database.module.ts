import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseController } from './controllers/database.controller';
import { UserService } from './entities/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user.entity';
import { Product, ProductClass, ProductImg } from './entities/product/product.entity';
import { UserProduct } from './entities/order/UserProduct.entity';
import { ProductClassService } from './entities/productClass/productClass.service';
import { ProductImgService, ProductService } from './entities/product/product.service';
import { userProductService } from './entities/order/userProduct.service';
import { DatabaseService } from './database.service';
import { NoauthController } from './controllers/noauth.controller';
import { DBMiddleware } from './database.middleware';

import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env.create_table === '1';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "sqlite",
        database: "database.sqlite",
        entities: [User, ProductClass, Product, UserProduct, ProductImg],
        synchronize: env,
        dropSchema: env,
      }
    ),
    TypeOrmModule.forFeature([User, ProductClass, Product, UserProduct, ProductImg]),
    DatabaseModule,
  ],
  controllers: [DatabaseController, NoauthController],
  providers: [UserService, ProductClassService, ProductService, userProductService, DatabaseService, ProductImgService]
})
export class DatabaseModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(DBMiddleware).forRoutes(DatabaseController);
  // }
}
