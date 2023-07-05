import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CAMPAING_URL } from 'src/app/shared/helpers/constants/url.constants';
import {
  Campaing,
  GetAllCampaingResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import {
  PostCampaingRequest,
  PutCampaingRequest,
} from 'src/app/core/models/all/request/all-requests.request';
import { CampaingRepository } from 'src/app/core/repository/campaing/campaing.repository';

@Injectable({
  providedIn: 'root',
})
export class CampaingWebRepository extends CampaingRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getAllCampaing(): Promise<Campaing[]> {
    const url = `${CAMPAING_URL}`;

    return lastValueFrom(this.http.get<Campaing[]>(url));
  }
  postCampaing(
    bodyRequest: PostCampaingRequest
  ): Promise<GetAllCampaingResponse> {
    const url = `${CAMPAING_URL}`;
    return lastValueFrom(
      this.http.post<GetAllCampaingResponse>(url, bodyRequest)
    );
  }

  putCampaing(
    id: string,
    bodyRequest: PutCampaingRequest
  ): Promise<GetAllCampaingResponse | null> {
    const url = `${CAMPAING_URL}/${id}`;
    return lastValueFrom(
      this.http.put<GetAllCampaingResponse>(url, bodyRequest)
    );
  }
  getCampaingById(id: string): Promise<Campaing | null> {
    const url = `${CAMPAING_URL}/${id}`;
    return lastValueFrom(this.http.get<Campaing>(url));
  }

  deleteCampaing(id: string): Promise<void> {
    const url = `${CAMPAING_URL}/${id}`;
    return lastValueFrom(this.http.delete<void>(url));
  }
}
