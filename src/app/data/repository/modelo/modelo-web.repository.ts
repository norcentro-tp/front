import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CATEGORY_URL, INVENTORY_URL, MODEL_URL } from 'src/app/shared/helpers/constants/url.constants';
import { Category, Model } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { ModeloRepository } from 'src/app/core/repository/modelo/modelo.repository';
import { PostModeloRequest, PutModeloRequest } from 'src/app/core/models/inventory/request/post-moto.request';

@Injectable({
    providedIn: 'root'
})

export class ModeloWebRepository extends ModeloRepository  {

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    getAllModelo(): Promise<Model[]>{

        const url = `${MODEL_URL}`

        return lastValueFrom(this.http.get<Model[]>(url))
    }
    postModelo(
        bodyRequest: PostModeloRequest
      ): Promise<Model> {
        const url = `${MODEL_URL}`;
        return lastValueFrom(
          this.http.post<Model>(url, bodyRequest)
        );
      }
    
      putModelo(
        id: string,
        bodyRequest: PutModeloRequest
      ): Promise<Model | null> {
        const url = `${MODEL_URL}/${id}`;
        return lastValueFrom(
          this.http.put<Model>(url, bodyRequest)
        );
      }
      getModeloById(id: string): Promise<Model | null> {
        const url = `${MODEL_URL}/${id}`;
        return lastValueFrom(this.http.get<Model>(url));
      }
        
      deleteModelo(id: string): Promise<void> {
          const url = `${MODEL_URL}/${id}`;
          return lastValueFrom(this.http.delete<void>(url));
        }
    }

    
