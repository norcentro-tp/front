import { Injectable } from '@angular/core';
import { Model } from '../../models/all/response/all-responses.response';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { ModelRepository } from '../../repository/model/model.repository';

@Injectable({
  providedIn: 'root',
})
export class UpdateCatalogueUseCase
  implements UseCasePromise<string,Model>
{
  constructor(private _modelRepository: ModelRepository) {}

  execute(id: string): Promise<Model> {
    return this._modelRepository.updateCatalogue(id);
  }
}