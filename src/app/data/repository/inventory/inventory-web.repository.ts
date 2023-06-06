import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { 
  PostInventoryRequest,
  PutInventoryRequest } from 'src/app/core/models/all/request/all-requests.request';
import {
  GetAllInventoryResponse,
  InventoryItemResponse } from 'src/app/core/models/all/response/all-responses.response';
import { InventoryRepository } from 'src/app/core/repository/inventory/inventory.repository';
import { INVENTORY_URL } from 'src/app/shared/helpers/constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class InventoryWebRepository extends InventoryRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getInventoryById(id: string): Promise<InventoryItemResponse | null> {
    const url = `${INVENTORY_URL}/${id}`;
    return lastValueFrom(this.http.get<InventoryItemResponse>(url));
  }

  getAllInventory(): Promise<GetAllInventoryResponse[]> {
    const url = `${INVENTORY_URL}`;

    return lastValueFrom(this.http.get<GetAllInventoryResponse[]>(url));
  }

  postMoto(bodyRequest: PostInventoryRequest): Promise<GetAllInventoryResponse> {
    const url = `${INVENTORY_URL}`;
    return lastValueFrom(
      this.http.post<GetAllInventoryResponse>(url, bodyRequest)
    );
  }

  putMoto(id:string, bodyRequest: PutInventoryRequest): Promise<GetAllInventoryResponse | null> {
    const url = `${INVENTORY_URL}/${id}`;
    return lastValueFrom(
      this.http.put<GetAllInventoryResponse>(url, bodyRequest)
    );
  }
    
  deleteMoto(id: string): Promise<void> {
      const url = `${INVENTORY_URL}/${id}`;
      return lastValueFrom(this.http.delete<void>(url));
    }
}
