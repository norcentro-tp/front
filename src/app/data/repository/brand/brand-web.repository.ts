import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BRAND_URL } from 'src/app/shared/helpers/constants/url.constants';
import { Brand, BrandItemResponse, Category } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { BrandRepository } from 'src/app/core/repository/brand/brand.repository';
import { PostBrandRequest, PutBrandRequest } from 'src/app/core/models/inventory/request/post-moto.request';

@Injectable({
  providedIn: 'root'
})

export class BrandWebRepository extends BrandRepository {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getAllBrands(): Promise<Brand[]> {

    const url = `${BRAND_URL}`

    return lastValueFrom(this.http.get<Brand[]>(url))
  }

  postBrand(bodyRequest: PostBrandRequest): Promise<Brand> {
    const url = `${BRAND_URL}`;
    return lastValueFrom(
      this.http.post<Brand>(url, bodyRequest)
    );
  }
  putBrand(request: PutBrandRequest): Promise<Brand | null> {

    const url = `${BRAND_URL}/${request.id}`;

    return lastValueFrom(
      this.http.put<Brand>(url, request)
    );
  }
  getBrandById(id: string): Promise<BrandItemResponse | null> {
    const url = `${BRAND_URL}/${id}`;
    return lastValueFrom(this.http.get<BrandItemResponse>(url));
  }
    
  deleteBrand(id: string): Promise<void> {
      const url = `${BRAND_URL}/${id}`;
      return lastValueFrom(this.http.delete<void>(url));
  }

}