import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Offer } from '../../models/all/response/all-responses.response';
import { OfferRepository } from '../../repository/offer/offer.repository';

@Injectable({
  providedIn: 'root',
})
export class GetOfferByIdUseCase
  implements UseCasePromise<string, Offer | null>
{
  constructor(private _offerRepository: OfferRepository) {}

  execute(id: string): Promise<Offer | null> {
    return this._offerRepository.getOfferById(id);
  }
}
