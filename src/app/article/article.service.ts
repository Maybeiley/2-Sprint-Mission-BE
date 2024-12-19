import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Article } from '@prisma/client';
import { ArticleRepository } from './article.repository';

export type ArticleResponse = {
  totalCount: number;
  list: Article[];
};

@Injectable()
export class ArticleService {
  constructor(private readonly repository: ArticleRepository) {}

  async get(queries: {
    skip?: number;
    take?: number;
    orderBy?: 'oldest' | 'newest';
    keyword?: string;
  }): Promise<ArticleResponse> {
    const { skip, take, orderBy, keyword } = queries;
    const where = keyword
      ? {
          OR: [
            { title: { contains: keyword } },
            { content: { contains: keyword } },
          ],
        }
      : undefined;

    let sortOption;
    switch (orderBy) {
      case 'oldest':
        sortOption = { createdAt: 'asc' };
        break;
      case 'newest':
      default:
        sortOption = { createdAt: 'desc' };
    }
    const sortOrder = sortOption;

    const list = await this.repository.get(skip, take, where, sortOrder);
    const totalCount = await this.repository.count(where);
    return { totalCount, list };
  }

  async getById(id: string): Promise<Article> {
    const article = await this.repository.getById(id);

    if (!article) {
      throw new NotFoundException('게시물이 존재하지 않습니다');
    }

    return article;
  }

  async create(
    userId: string,
    data: Prisma.ArticleCreateInput,
  ): Promise<Article> {
    const newData = { writerId: userId, ...data };
    return await this.repository.create(newData);
  }

  async update(articleId: string, data: Partial<Article>): Promise<Article> {
    const where = {
      id: articleId,
    };
    return await this.repository.update(where, data);
  }

  async delete(articleId, userId): Promise<Article> {
    const where = { id: articleId };

    return await this.repository.delete(where);
  }
}
