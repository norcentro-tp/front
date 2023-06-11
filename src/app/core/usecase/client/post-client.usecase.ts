import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllClientResponse, GetAllSupplierResponse } from '../../models/all/response/all-responses.response';
import { PostClientRequest, PostSupplierRequest } from '../../models/all/request/all-requests.request';
import { ClientRepository } from '../../repository/client/client.repository';

@Injectable({
  providedIn: 'root',
})
export class PostClientUseCase
  implements UseCasePromise<null, GetAllClientResponse>
{
  constructor(private _clientRepository: ClientRepository) {}

  execute(bodyrequest: PostClientRequest): Promise<GetAllClientResponse> {
    return this._clientRepository.postClient(bodyrequest);
  }
}
