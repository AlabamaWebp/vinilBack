import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  login: string;
  @Column()
  password: string;
  @Column()
  fio: string;
  @Column()
  tel: string;
  @Column()
  country: string;
  @Column()
  city: string;
}
// {
// "login": "1",
// "password": "1",
// "fio": "1",
// "tel": "1",
// "country": "1",
// "city": "1"
// }