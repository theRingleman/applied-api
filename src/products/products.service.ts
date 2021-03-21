import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dtos/create.product.dto";
import { UpdateProductDto } from "./dtos/update.product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>
  ){}

  findAll(): Promise<ProductEntity[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    return this.attemptProductFind(id);
  }

  async update(id: number, updateDTO: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.attemptProductFind(id);
    await this.productsRepository.update(id, {...product, ...updateDTO})
    return this.productsRepository.findOne(id);
  }

  create(productDTO: CreateProductDto): Promise<ProductEntity> {
    return this.productsRepository.save(productDTO);
  }

  async delete(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }

  private async attemptProductFind(id: number): Promise<ProductEntity> {
    try {
      return await this.productsRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException(`Product with id ${id} was not found.`)
    }
  }
}
