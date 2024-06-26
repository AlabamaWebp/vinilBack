import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity('UserProduct')
export class UserProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, {eager: true})
  user: User;
  @ManyToOne(() => Product, {eager: true})
  product: Product;
  @Column()
  status: number; // 0 - favorite / 1 - bascet / 2 - order
}
// {
// "login": "1",
// "password": "1",
// "fio": "1",
// "tel": "1",
// "country": "1",
// "city": "1"
// }