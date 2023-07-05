import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Model } from '../../models/all/response/all-responses.response';
import { ModelRepository } from '../../repository/model/model.repository';
import { PostModelRequest } from '../../models/all/request/all-requests.request';

@Injectable({
  providedIn: 'root',
})
export class PostModelUseCase
  implements UseCasePromise<null, Model>
{
  constructor(private _modelRepository: ModelRepository) {}

  execute(bodyrequest: PostModelRequest): Promise<Model> {
    return this._modelRepository.postModel(bodyrequest);
  }
}
