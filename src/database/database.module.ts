import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Product, ProductClass } from './product/product.entity';
import { UserProduct } from './order/UserProduct.entity';
import { ProductClassService } from './product/productClass.service';
import { ProductService } from './product/product.service';
import { userProductService } from './order/userProduct.service';
import { DatabaseService } from './database.service';
import { NoauthController } from './noauth/noauth.controller';
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
        entities: [User, ProductClass, Product, UserProduct],
        synchronize: env,
        dropSchema: env,
      }
    ),
    TypeOrmModule.forFeature([User, ProductClass, Product, UserProduct]),
    DatabaseModule,
  ],
  controllers: [DatabaseController, NoauthController],
  providers: [UserService, ProductClassService, ProductService, userProductService, DatabaseService]
})
export class DatabaseModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(DBMiddleware).forRoutes(DatabaseController);
  // }
}
