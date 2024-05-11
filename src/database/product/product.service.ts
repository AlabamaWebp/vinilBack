import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly userRepository: Repository<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    return this.userRepository.find();
  }

  async create(user: Product): Promise<Product>  //Promise<User> 
  {
    return this.userRepository.save(user);
  }

  async find(id: number): Promise<Product> {
    return await this.userRepository.findOneBy({ id: id })
    .then(el => el)
  }


  // onModuleInit() {
  //   const d = data;
  //   const class_id = Object.keys(data);
  //   // let newData: any[] = [];
  //   setTimeout(() => {
  //     class_id.forEach((el, i) => {
  //       d[el].forEach((el2) => {
  //         const tmp = el2;
  //         tmp['class'] = i + 1; // el
  //         tmp['count'] = getRandomInt();
  //         this.userRepository.save(tmp);
  //       })
  //     })
  //   }, 1000);
  // }
  

}