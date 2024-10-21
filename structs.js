import * as s from "superstruct";
import isUuid from "is-uuid";

const Uuid = s.define("Uuid", (value) => isUuid.v4(value));

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 10, 100),
  price: s.min(s.number(), 0),
  tags: s.array(s.size(s.string(), 1, 5)),
});

export const PatchProduct = s.partial(CreateProduct);

// 게시글과 댓글에 대한 조건은 임의로 설정함

export const CreateArticle = s.object({
  title: s.string(),
  content: s.string(),
});

export const PatchArticle = s.partial(CreateArticle);

export const CreateProductComment = s.object({
  content: s.string(),
});

export const PatchProductComment = s.partial(CreateProductComment);

export const CreateArticleComment = s.object({
  content: s.string(),
});

export const PatchArticleComment = s.partial(CreateArticleComment);
