import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('ProductClass')
export class ProductClass extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: number;
}