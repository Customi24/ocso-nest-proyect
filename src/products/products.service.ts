import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository:  Repository<Product>
  ){}
  /*private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Takis Guacamole 240g",
      price: 20,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "mtndew 355ml",
      price: 25,
      countSeal: 2,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "MoguMogu 320ml",
      price: 22,
      countSeal: 3,
      provider: uuid(),
    }
  ]
*/
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto)
    return product;
  }

  findAll() {
    return this.productRepository.find(/*{
      loadEagerRelations: true,
      relations:{
        provider: true,
      }
    }*/);
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id
    })
    if (!product) throw new NotFoundException()
    return product;
  }

  findByProvider(id: string){
   return this.productRepository.findBy({
      provider:{
        providerId: id,
      }
   })
   
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId:  id,
      ...updateProductDto,
    })
    if (!productToUpdate) throw new NotFoundException()
    this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  remove(id: string) {
    this.findOne(id)
    this.productRepository.delete({
      productId: id,
    })
    return {
      message: `objeto con id ${id} eliminado`
    }
  }


}
