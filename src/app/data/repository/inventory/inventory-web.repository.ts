import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PostInventoryRequest } from 'src/app/core/models/inventory/request/post-moto.request';
import {
  GetAllInventoryResponse,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { InventoryRepository } from 'src/app/core/repository/inventory/inventory.repository';
import { INVENTORY_URL } from 'src/app/shared/helpers/constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class InventoryWebRepository extends InventoryRepository {
  constructor(private http: HttpClient) {
    super();
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
}
