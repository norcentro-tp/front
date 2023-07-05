import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllCampaingResponse,  } from '../../models/all/response/all-responses.response';
import { PostCampaingRequest } from '../../models/all/request/all-requests.request';
import { CampaingRepository } from '../../repository/campaing/campaing.repository';

@Injectable({
  providedIn: 'root',
})
export class PostCampaingUseCase
  implements UseCasePromise<null, GetAllCampaingResponse>
{
  constructor(private _campaingRepository: CampaingRepository) {}

  execute(bodyrequest: PostCampaingRequest): Promise<GetAllCampaingResponse> {
    return this._campaingRepository.postCampaing(bodyrequest);
  }
}
