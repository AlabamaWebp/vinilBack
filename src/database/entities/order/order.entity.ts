import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';



@Entity('Order')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User)
  user: User;
  @OneToMany(() => OrderProduct, e => e, { cascade: true })
  product: OrderProduct[];
}

@Entity('OrderProduct')
export class OrderProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product, e => e)
  product: Product;
  @ManyToOne(() => Order, e => e)
  order: Order;
}