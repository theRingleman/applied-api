import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { productsMock } from './__mocks__/products.mock';
import { productMock } from './__mocks__/product.mock';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let productsRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productsRepository = module.get(getRepositoryToken(ProductEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of products', async () => {
      const findMock = jest
        .spyOn(productsRepository, 'find')
        .mockResolvedValueOnce(productsMock);

      const products = await service.findAll();

      expect(products).toBe(productsMock);
      expect(findMock).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const findMock = jest
        .spyOn(productsRepository, 'findOneOrFail')
        .mockResolvedValueOnce(productMock);

      const product = await service.findOne(1);

      expect(product).toBe(productMock);
      expect(findMock).toHaveBeenCalled();
      expect(findMock).toHaveBeenCalledWith(1);
    });

    it('should fail gracefully when a product is not found', async () => {
      jest
        .spyOn(productsRepository, 'findOneOrFail')
        .mockRejectedValue(new Error());

      await expect(service.findOne(1)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
