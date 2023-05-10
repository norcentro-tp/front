import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BRAND_URL, CATEGORY_URL, INVENTORY_URL } from 'src/app/shared/helpers/constants/url.constants';
import { Brand, Category } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { BrandRepository } from 'src/app/core/repository/brand/category.repository';

@Injectable({
    providedIn: 'root'
})

export class BrandWebRepository extends BrandRepository  {

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    getAllBrands(): Promise<Brand[]>{

        const url = `${BRAND_URL}`

        return lastValueFrom(this.http.get<Brand[]>(url))
    }

    
}