import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CATEGORY_URL, INVENTORY_URL, MODEL_URL } from 'src/app/shared/helpers/constants/url.constants';
import { Category, Model } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { ModelRepository } from 'src/app/core/repository/modelo/model.repository';

@Injectable({
    providedIn: 'root'
})

export class ModelWebRepository extends ModelRepository  {

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    getAllModels(): Promise<Model[]>{

        const url = `${MODEL_URL}`

        return lastValueFrom(this.http.get<Model[]>(url))
    }

    
}