import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "sqlite",
        database: "database.sqlite",
        entities: [User, ProductClass, Product, UserProduct],
        synchronize: false,
        dropSchema: false,
      }
    ),
    TypeOrmModule.forFeature([User, ProductClass, Product, UserProduct]),
    DatabaseModule,
  ],
  controllers: [DatabaseController],
  providers: [UserService, ProductClassService, ProductService, userProductService, DatabaseService]
})
export class DatabaseModule {}
