import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid} from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
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

  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    this.products.push(createProductDto)
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.filter((product) => product.productId == id)[0]
    if (!productFound) throw new NotFoundException()
    return productFound;
  }

  findByProvider(id: string){
    const productsFound = this.products.filter((product) => product.provider == id) 
    if (productsFound.length == 0) throw new NotFoundException()
    return productsFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product = this.findOne(id)
    return {
      ...product,
      ...updateProductDto,
    }
  }

  remove(id: string) {
    const {productId} = this.findOne(id);
    this.products = this.products.filter((product) => product.productId != productId)
    return this.products;
  }


}