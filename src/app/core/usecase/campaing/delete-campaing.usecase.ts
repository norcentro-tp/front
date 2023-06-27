import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { CampaingRepository,  } from '../../repository/campaing/campaing.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteCampaingUseCase
  implements UseCasePromise<string,void>
{
  constructor(private _campaingRepository: CampaingRepository) {}

  execute(id: string): Promise<void> {
    return this._campaingRepository.deleteCampaing(id);
  }
}