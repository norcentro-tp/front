import { PostBrandRequest, PutBrandRequest, PutSupplierRequest } from "../../models/inventory/request/post-moto.request";
import { Brand, BrandItemResponse, GetAllSupplierResponse } from "../../models/inventory/response/get-all-inventory.response";

export abstract class BrandRepository {
  abstract getBrandById(id: string): Promise<BrandItemResponse | null>;
  abstract getAllBrands(): Promise<Brand[]>;
  abstract postBrand(
    bodyRequest: PostBrandRequest
  ): Promise<Brand>;

  abstract putBrand(request: PutBrandRequest): Promise<Brand>;
}