import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CATEGORY_URL, INVENTORY_URL } from 'src/app/shared/helpers/constants/url.constants';
import { Category, PostCategoryRequest } from 'src/app/core/models/inventory/response/get-all-inventory.response';
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
    
}