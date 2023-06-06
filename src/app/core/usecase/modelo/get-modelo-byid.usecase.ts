import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import {
  Model,
} from '../../models/inventory/response/get-all-inventory.response';
import { ModeloRepository } from '../../repository/modelo/modelo.repository';

@Injectable({
  providedIn: 'root',
})
export class GetModeloByIdUseCase
  implements UseCasePromise<string, Model | null>
{
  constructor(private _modeloRepository: ModeloRepository) {}

  execute(id: string): Promise<Model| null> {
    return this._modeloRepository.getModeloById(id);
  }
}
