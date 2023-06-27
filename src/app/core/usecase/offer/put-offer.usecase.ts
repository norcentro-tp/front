import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllOfferResponse } from '../../models/all/response/all-responses.response';
import { PutOfferRequest } from '../../models/all/request/all-requests.request';
import { OfferRepository } from '../../repository/offer/offer.repository';

@Injectable({
  providedIn: 'root',
})
export class PutOfferUseCase
  implements
    UseCasePromise<
      { id: string; bodyRequest: PutOfferRequest },
      GetAllOfferResponse
    >
{
  constructor(private _offerRepository: OfferRepository) {}

  execute({
    id,
    bodyRequest,
  }: {
    id: string;
    bodyRequest: PutOfferRequest;
  }): Promise<GetAllOfferResponse> {
    return this._offerRepository.putOffer(id, bodyRequest);
  }
}
