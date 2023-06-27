import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllCampaingResponse } from '../../models/all/response/all-responses.response';
import { PutCampaingRequest } from '../../models/all/request/all-requests.request';
import { CampaingRepository } from '../../repository/campaing/campaing.repository';

@Injectable({
  providedIn: 'root',
})
export class PutCampaingUseCase
  implements
    UseCasePromise<
      { id: string; bodyRequest: PutCampaingRequest },
      GetAllCampaingResponse
    >
{
  constructor(private _campaingRepository: CampaingRepository) {}

  execute({
    id,
    bodyRequest,
  }: {
    id: string;
    bodyRequest: PutCampaingRequest;
  }): Promise<GetAllCampaingResponse> {
    return this._campaingRepository.putCampaing(id, bodyRequest);
  }
}
