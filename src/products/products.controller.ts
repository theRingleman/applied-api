import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductEntity } from "./entities/product.entity";
import { UpdateProductDto } from "./dtos/update.product.dto";
import { CreateProductDto } from "./dtos/create.product.dto";

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async index(): Promise<ProductEntity[]> {
    return this.productsService.findAll();
  }

  @Get('/:id')
  async show(@Param('id') id: number): Promise<ProductEntity> {
    return this.productsService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() updateDTO: UpdateProductDto): Promise<ProductEntity> {
    return this.productsService.update(id, updateDTO);
  }

  @Post()
  async create(@Body() createDTO: CreateProductDto): Promise<ProductEntity> {
    return this.productsService.create(createDTO);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productsService.delete(id);
  }
}
