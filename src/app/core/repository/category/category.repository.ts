import { Category, CategoryItemResponse } from "../../models/inventory/response/get-all-inventory.response";
import { PostCategoryRequest, PutCategoryRequest } from "../../models/inventory/request/post-moto.request";

export abstract class CategoryRepository {
  abstract getCategoryById(id: string): Promise<CategoryItemResponse | null>;

  abstract getAllCategories(): Promise<Category[]>;
  
  abstract postCategory(
        bodyRequest: PostCategoryRequest
      ): Promise<Category>;
  
  abstract putCategory(request: PutCategoryRequest): Promise<Category>;

  abstract deleteCategory(id: string):Promise<void>;
}