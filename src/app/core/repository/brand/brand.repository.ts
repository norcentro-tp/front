import { PostBrandRequest, PutBrandRequest } from "../../models/all/request/all-requests.request";
import { Brand, BrandItemResponse } from "../../models/all/response/all-responses.response";

export abstract class BrandRepository {
  abstract getBrandById(id: string): Promise<BrandItemResponse | null>;

  abstract getAllBrands(): Promise<Brand[]>;

  abstract postBrand(
    bodyRequest: PostBrandRequest
  ): Promise<Brand>;

  abstract putBrand(request: PutBrandRequest): Promise<Brand>;

  abstract deleteBrand(id: string):Promise<void>;
}