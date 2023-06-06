import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Brand, Model } from '../../models/inventory/response/get-all-inventory.response';
import { PutModeloRequest } from '../../models/inventory/request/post-moto.request';
import { ModeloRepository } from '../../repository/modelo/modelo.repository';

@Injectable({
  providedIn: 'root',
})
export class PutModeloUseCase
  implements
    UseCasePromise<
      { id: string; bodyRequest: PutModeloRequest },
      Model
    >
{
  constructor(private _modeloRepository: ModeloRepository) {}

  execute({
    id,
    bodyRequest,
  }: {
    id: string;
    bodyRequest: PutModeloRequest;
  }): Promise<Model> {
    return this._modeloRepository.putModelo(id, bodyRequest);
  }
}