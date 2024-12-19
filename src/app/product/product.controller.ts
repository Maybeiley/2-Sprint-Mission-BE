import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductResponse, ProductService } from './product.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { UserId } from 'src/decorators/user.decorator';
import { Public } from 'src/decorators/public.decorator';
import { ProductGuard } from 'src/guards/authorization.guard';

@Controller('items')
export class ProductController {
  constructor(private service: ProductService) {}

  @Public()
  @Get()
  async getProducts(@Query() queries: Query.List): Promise<ProductResponse> {
    return this.service.get(queries);
  }

  @Public()
  @Get(':productId')
  async getProductById(
    @Param('productId') productId: string,
  ): Promise<Product> {
    return this.service.getById(productId);
  }

  @Post()
  async createProduct(
    @UserId() userId: string,
    @Body() data: CreateProductDto,
  ): Promise<Product> {
    return await this.service.create(userId, data);
  }

  @UseGuards(ProductGuard)
  @Patch(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product> {
    return await this.service.update(productId, data);
  }

  @UseGuards(ProductGuard)
  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string): Promise<Product> {
    return await this.service.delete({ id: productId });
  }
}
