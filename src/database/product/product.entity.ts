import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { ProductClass } from './productClass.entity';

@Entity('Product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => ProductClass, {eager: true})
  className: ProductClass | string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  hover: string;
  @Column()
  full: string; 
  // @Column()
  // count: number; 
}
export { ProductClass };

