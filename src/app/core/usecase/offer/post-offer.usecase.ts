import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllOfferResponse,  } from '../../models/all/response/all-responses.response';
import { PostOfferRequest } from '../../models/all/request/all-requests.request';
import { OfferRepository } from '../../repository/offer/offer.repository';

@Injectable({
  providedIn: 'root',
})
export class PostOfferUseCase
  implements UseCasePromise<null, GetAllOfferResponse>
{
  constructor(private _offerRepository: OfferRepository) {}

  execute(bodyrequest: PostOfferRequest): Promise<GetAllOfferResponse> {
    return this._offerRepository.postOffer(bodyrequest);
  }
}
