import { Brand } from "../../models/inventory/response/get-all-inventory.response";

export abstract class BrandRepository {

    abstract getAllBrands(): Promise<Brand[]>;

}