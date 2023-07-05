import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Campaing } from '../../models/all/response/all-responses.response';
import { CampaingRepository } from '../../repository/campaing/campaing.repository';

@Injectable({
  providedIn: 'root',
})
export class GetCampaingByIdUseCase
  implements UseCasePromise<string, Campaing | null>
{
  constructor(private _campaingRepository: CampaingRepository) {}

  execute(id: string): Promise<Campaing | null> {
    return this._campaingRepository.getCampaingById(id);
  }
}
