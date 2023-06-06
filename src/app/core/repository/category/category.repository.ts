import { Category, CategoryItemResponse } from "../../models/all/response/all-responses.response";
import { PostCategoryRequest, PutCategoryRequest } from "../../models/all/request/all-requests.request";

export abstract class CategoryRepository {
  abstract getCategoryById(id: string): Promise<CategoryItemResponse | null>;

  abstract getAllCategories(): Promise<Category[]>;
  
  abstract postCategory(
        bodyRequest: PostCategoryRequest
      ): Promise<Category>;
  
  abstract putCategory(request: PutCategoryRequest): Promise<Category>;

  abstract deleteCategory(id: string):Promise<void>;
}