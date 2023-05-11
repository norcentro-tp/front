import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {
  MODEL_URL,
  SUPPLIER_URL,
} from 'src/app/shared/helpers/constants/url.constants';
import {
  Category,
  GetAllSupplierResponse,
  Model,
  Supplier,
  SupplierItemResponse,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import {
  PostSupplierRequest,
  PutSupplierRequest,
} from 'src/app/core/models/inventory/request/post-moto.request';
import { SupplierRepository } from 'src/app/core/repository/supplier/supplier.repository';

@Injectable({
  providedIn: 'root',
})
export class SupplierWebRepository extends SupplierRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getAllSuppliers(): Promise<Supplier[]> {
    const url = `${SUPPLIER_URL}`;

    return lastValueFrom(this.http.get<Supplier[]>(url));
  }
  postSupplier(
    bodyRequest: PostSupplierRequest
  ): Promise<GetAllSupplierResponse> {
    const url = `${SUPPLIER_URL}`;
    return lastValueFrom(
      this.http.post<GetAllSupplierResponse>(url, bodyRequest)
    );
  }

  putSupplier(
    id: string,
    bodyRequest: PutSupplierRequest
  ): Promise<GetAllSupplierResponse | null> {
    const url = `${SUPPLIER_URL}/${id}`;
    return lastValueFrom(
      this.http.put<GetAllSupplierResponse>(url, bodyRequest)
    );
  }
  getSupplierById(id: string): Promise<SupplierItemResponse | null> {
    const url = `${SUPPLIER_URL}/${id}`;
    return lastValueFrom(this.http.get<SupplierItemResponse>(url));
  }
}
