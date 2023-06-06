import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { ModelRepository } from '../../repository/model/model.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteModelUseCase
  implements UseCasePromise<string,void>
{
  constructor(private _modelRepository: ModelRepository) {}

  execute(id: string): Promise<void> {
    return this._modelRepository.deleteModel(id);
  }
}