import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseController } from './controllers/database.controller';
import { UserService } from './entities/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user.entity';
import { Product, ProductImg } from './entities/product/product.entity';
import { UserProduct } from './entities/userProduct/UserProduct.entity';
import { ProductClassService } from './entities/productClass/productClass.service';
import { ProductImgService, ProductService } from './entities/product/product.service';
import { userProductService } from './entities/userProduct/userProduct.service';
import { DatabaseService } from './database.service';
import { NoauthController } from './controllers/noauth.controller';
import { DBMiddleware } from './database.middleware';
import { ProductClass } from './entities/productClass/productClass.entity';

import * as dotenv from 'dotenv';
import { OrderService } from './entities/order/order.service';
import { Order, OrderProduct } from './entities/order/order.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from 'src/mailer/mail.config';
dotenv.config();
const env = process.env.create_table === '1';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "sqlite",
        database: "database.sqlite",
        entities: [User, ProductClass, Product, UserProduct, ProductImg, Order, OrderProduct],
        synchronize: env,
        dropSchema: env,
      }
    ),
    TypeOrmModule.forFeature([User, ProductClass, Product, UserProduct, ProductImg, Order, OrderProduct]),
    DatabaseModule,
    MailerModule.forRootAsync({
      useFactory: getMailConfig,
    }),
  ],
  controllers: [DatabaseController, NoauthController],
  providers: [UserService, ProductClassService, ProductService, userProductService, DatabaseService, ProductImgService, OrderService]
})
export class DatabaseModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(DBMiddleware).forRoutes(DatabaseController);
  // }
}
