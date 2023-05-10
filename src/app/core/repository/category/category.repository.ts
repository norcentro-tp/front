import { Category } from "../../models/inventory/response/get-all-inventory.response";
import { PostCategoryRequest } from "../../models/inventory/request/post-moto.request";

export abstract class CategoryRepository {

    abstract getAllCategories(): Promise<Category[]>;
    abstract postCategory(
        bodyRequest: PostCategoryRequest
      ): Promise<Category>;
}