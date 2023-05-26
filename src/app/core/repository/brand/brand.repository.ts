import { PostBrandRequest, PutBrandRequest } from "../../models/inventory/request/post-moto.request";
import { Brand, BrandItemResponse } from "../../models/inventory/response/get-all-inventory.response";

export abstract class BrandRepository {
  abstract getBrandById(id: string): Promise<BrandItemResponse | null>;

  abstract getAllBrands(): Promise<Brand[]>;

  abstract postBrand(
    bodyRequest: PostBrandRequest
  ): Promise<Brand>;

  abstract putBrand(request: PutBrandRequest): Promise<Brand>;

  abstract deleteBrand(id: string):Promise<void>;
}