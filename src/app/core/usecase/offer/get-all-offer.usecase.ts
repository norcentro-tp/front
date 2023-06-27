import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Offer} from '../../models/all/response/all-responses.response';
import { OfferRepository } from '../../repository/offer/offer.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllOfferUseCase implements UseCasePromise<null, Offer[]> {

    constructor(
        private _offerRepository: OfferRepository
    ) { }

    execute(): Promise<Offer[]> {
        return this._offerRepository.getAllOffer()
    }
}