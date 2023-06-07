import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Model } from '../../models/all/response/all-responses.response';
import { PutModelRequest } from '../../models/all/request/all-requests.request';
import { ModelRepository } from '../../repository/model/model.repository';

@Injectable({
  providedIn: 'root',
})
export class PutModelUseCase
  implements
    UseCasePromise<PutModelRequest,Model>
{
  constructor(private _modelRepository: ModelRepository) {}

  execute(request: PutModelRequest): Promise<Model> {
    return this._modelRepository.putModel(request);
  }
}