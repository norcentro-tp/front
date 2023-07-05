import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BRAND_URL } from 'src/app/shared/helpers/constants/url.constants';
import { Brand, BrandItemResponse } from 'src/app/core/models/all/response/all-responses.response';
import { BrandRepository } from 'src/app/core/repository/brand/brand.repository';
import { PostBrandRequest, PutBrandRequest } from 'src/app/core/models/all/request/all-requests.request';

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
    const formData = new FormData();
    const keys = Object.keys(bodyRequest);

    keys.forEach((key) => {
      formData.append(key, bodyRequest[key]);
    });
    const url = `${BRAND_URL}`;
    return lastValueFrom(
      this.http.post<Brand>(url, formData)
    );
  }
  putBrand(request: PutBrandRequest): Promise<Brand | null> {
    const formData = new FormData();
    const keys = Object.keys(request);

    keys.forEach((key) => {
      formData.append(key, request[key]);
    });

    const url = `${BRAND_URL}/${request.id}`;

    return lastValueFrom(
      this.http.put<Brand>(url, formData)
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