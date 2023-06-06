import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { BrandRepository } from '../../repository/brand/brand.repository';
import { ModeloRepository } from '../../repository/modelo/modelo.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteModeloUseCase
  implements UseCasePromise<string,void>
{
  constructor(private _modeloRepository: ModeloRepository) {}

  execute(id: string): Promise<void> {
    return this._modeloRepository.deleteModelo(id);
  }
}