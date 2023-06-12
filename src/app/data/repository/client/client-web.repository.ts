import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CLIENT_URL, } from 'src/app/shared/helpers/constants/url.constants';
import {
  Client,
  GetAllClientResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import {
  PostClientRequest,
  PutClientRequest,
} from 'src/app/core/models/all/request/all-requests.request';
import { ClientRepository } from 'src/app/core/repository/client/client.repository';

@Injectable({
  providedIn: 'root',
})
export class ClientWebRepository extends ClientRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getAllClient(): Promise<Client[]> {
    const url = `${CLIENT_URL}`;

    return lastValueFrom(this.http.get<Client[]>(url));
  }
  postClient(
    bodyRequest: PostClientRequest
  ): Promise<GetAllClientResponse> {
    const url = `${CLIENT_URL}`;
    return lastValueFrom(
      this.http.post<GetAllClientResponse>(url, bodyRequest)
    );
  }

  putClient(
    id: string,
    bodyRequest: PutClientRequest
  ): Promise<GetAllClientResponse | null> {
    const url = `${CLIENT_URL}/${id}`;
    return lastValueFrom(
      this.http.put<GetAllClientResponse>(url, bodyRequest)
    );
  }
  getClientById(id: string): Promise<Client | null> {
    const url = `${CLIENT_URL}/${id}`;
    return lastValueFrom(this.http.get<Client>(url));
  }

  deleteClient(id: string): Promise<void> {
    const url = `${CLIENT_URL}/${id}`;
    return lastValueFrom(this.http.delete<void>(url));
  }
}
