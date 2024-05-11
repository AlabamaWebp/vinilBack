import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity('UserProduct')
export class UserProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.id)
  user: number;
  @ManyToOne(() => Product, (pr) => pr.id)
  product: number;
  @Column()
  count: number;
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