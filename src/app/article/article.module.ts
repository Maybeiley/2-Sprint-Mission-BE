import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleRepository, ArticleService, PrismaService],
  exports: [ArticleService],
})
export class ArticleModule {}
