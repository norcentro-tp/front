import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { OfferRepository,  } from '../../repository/offer/offer.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteOfferUseCase
  implements UseCasePromise<string,void>
{
  constructor(private _offerRepository: OfferRepository) {}

  execute(id: string): Promise<void> {
    return this._offerRepository.deleteOffer(id);
  }
}