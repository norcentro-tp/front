import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { OFFER_URL } from 'src/app/shared/helpers/constants/url.constants';
import {
  Offer,
  GetAllOfferResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import {
  PostOfferRequest,
  PutOfferRequest,
} from 'src/app/core/models/all/request/all-requests.request';
import { OfferRepository } from 'src/app/core/repository/offer/offer.repository';

@Injectable({
  providedIn: 'root',
})
export class OfferWebRepository extends OfferRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getAllOffer(): Promise<Offer[]> {
    const url = `${OFFER_URL}`;

    return lastValueFrom(this.http.get<Offer[]>(url));
  }
  postOffer(
    bodyRequest: PostOfferRequest
  ): Promise<GetAllOfferResponse> {
    const url = `${OFFER_URL}`;
    return lastValueFrom(
      this.http.post<GetAllOfferResponse>(url, bodyRequest)
    );
  }

  putOffer(
    id: string,
    bodyRequest: PutOfferRequest
  ): Promise<GetAllOfferResponse | null> {
    const url = `${OFFER_URL}/${id}`;
    return lastValueFrom(
      this.http.put<GetAllOfferResponse>(url, bodyRequest)
    );
  }
  getOfferById(id: string): Promise<Offer | null> {
    const url = `${OFFER_URL}/${id}`;
    return lastValueFrom(this.http.get<Offer>(url));
  }

  deleteOffer(id: string): Promise<void> {
    const url = `${OFFER_URL}/${id}`;
    return lastValueFrom(this.http.delete<void>(url));
  }
}
