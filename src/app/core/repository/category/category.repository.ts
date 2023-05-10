import { Category, PostCategoryRequest } from "../../models/inventory/response/get-all-inventory.response";

export abstract class CategoryRepository {

    abstract getAllCategories(): Promise<Category[]>;
    abstract postCategory(
        bodyRequest: PostCategoryRequest
      ): Promise<Category>;
}