import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SALE_URL } from 'src/app/shared/helpers/constants/url.constants';
import {
  Sale,
  GetAllSaleResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import {
  PostSaleRequest,
  PutSaleRequest,
} from 'src/app/core/models/all/request/all-requests.request';
import { SaleRepository } from 'src/app/core/repository/sale/sale.repository';

@Injectable({
  providedIn: 'root',
})
export class SaleWebRepository extends SaleRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getAllSale(): Promise<Sale[]> {
    const url = `${SALE_URL}`;

    return lastValueFrom(this.http.get<Sale[]>(url));
  }
  postSale(
    bodyRequest: PostSaleRequest
  ): Promise<Sale> {
    const formData = new FormData();
    const keys = Object.keys(bodyRequest);
    keys.forEach((key) => {
      formData.append(key, bodyRequest[key]);
    });
    const url = `${SALE_URL}`;
    return lastValueFrom(
      this.http.post<Sale>(url, formData)
    );
  }

  putSale(
    request: PutSaleRequest
  ): Promise<Sale | null> {
    const formData = new FormData();
    const keys = Object.keys(request);

    keys.forEach((key) => {
      formData.append(key, request[key]);
    });
    const url = `${SALE_URL}/${request._id}`;
    return lastValueFrom(
      this.http.put<Sale>(url, formData)
    );
  }
  
  getSaleById(id: string): Promise<Sale | null> {
    const url = `${SALE_URL}/${id}`;
    return lastValueFrom(this.http.get<Sale>(url));
  }

  deleteSale(id: string): Promise<void> {
    const url = `${SALE_URL}/${id}`;
    return lastValueFrom(this.http.delete<void>(url));
  }
}
