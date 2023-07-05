import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Campaing} from '../../models/all/response/all-responses.response';
import { CampaingRepository } from '../../repository/campaing/campaing.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllCampaingUseCase implements UseCasePromise<null, Campaing[]> {

    constructor(
        private _campaingRepository: CampaingRepository
    ) { }

    execute(): Promise<Campaing[]> {
        return this._campaingRepository.getAllCampaing()
    }
}