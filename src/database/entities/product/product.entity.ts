import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { ProductClass } from '../productClass/productClass.entity';



@Entity('Product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => ProductClass)
  className: ProductClass | string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  hover: string;
  @Column()
  full: string;
  @OneToMany(() => ProductImg, productImage => productImage.product, { cascade: true })
  images: ProductImg[];
  
}


@Entity('ProductImg')
export class ProductImg extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product, product => product.images) // {eager: true}
  product: Product | number;
  @Column()
  img: string;
}

