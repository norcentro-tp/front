import { Category } from "../../models/inventory/response/get-all-inventory.response";

export abstract class CategoryRepository {

    abstract getAllCategories(): Promise<Category[]>;

}