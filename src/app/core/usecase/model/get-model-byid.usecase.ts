import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import {
  Model,
} from '../../models/all/response/all-responses.response';
import { ModelRepository } from '../../repository/model/model.repository';

@Injectable({
  providedIn: 'root',
})
export class GetModelByIdUseCase
  implements UseCasePromise<string, Model | null>
{
  constructor(private _modelRepository: ModelRepository) {}

  execute(id: string): Promise<Model| null> {
    return this._modelRepository.getModelById(id);
  }
}
