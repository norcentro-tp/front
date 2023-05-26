import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CATEGORY_URL } from 'src/app/shared/helpers/constants/url.constants';
import { Category, CategoryItemResponse } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { PostCategoryRequest, PutCategoryRequest } from 'src/app/core/models/inventory/request/post-moto.request';
import { CategoryRepository } from 'src/app/core/repository/category/category.repository';

@Injectable({
    providedIn: 'root'
})

export class CategoryWebRepository extends CategoryRepository  {

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    getAllCategories(): Promise<Category[]>{

        const url = `${CATEGORY_URL}`

        return lastValueFrom(this.http.get<Category[]>(url))
    }
    postCategory(bodyRequest: PostCategoryRequest): Promise<Category> {
        const url = `${CATEGORY_URL}`;
        return lastValueFrom(
          this.http.post<Category>(url, bodyRequest)
        );
      }
    putCategory(request: PutCategoryRequest): Promise<Category | null> {

        const url = `${CATEGORY_URL}/${request.id}`;
    
        return lastValueFrom(
          this.http.put<Category>(url, request)
        );
      }
    getCategoryById(id: string): Promise<CategoryItemResponse | null> {
        const url = `${CATEGORY_URL}/${id}`;
        return lastValueFrom(this.http.get<CategoryItemResponse>(url));
      }
    
    deleteCategory(id: string): Promise<void> {
        const url = `${CATEGORY_URL}/${id}`;
        return lastValueFrom(this.http.delete<void>(url));
      }
    
}