import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Product, ProductClass } from './product/product.entity';
import { UserProduct } from './order/UserProduct.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "sqlite",
        database: "database.sqlite",
        entities: [User, Product, ProductClass, UserProduct],
        synchronize: true,
        dropSchema: true
        // "entities": [
        //     "src/**/*.entity.ts"
        // ],
    }
    ),
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
  ],
  controllers: [DatabaseController],
  providers: [UserService]
})
export class DatabaseModule {}
