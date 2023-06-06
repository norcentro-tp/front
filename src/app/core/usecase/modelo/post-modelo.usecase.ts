import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Brand, Model,  } from '../../models/inventory/response/get-all-inventory.response';
import { ModeloRepository } from '../../repository/modelo/modelo.repository';
import { PostModeloRequest } from '../../models/inventory/request/post-moto.request';

@Injectable({
  providedIn: 'root',
})
export class PostModeloUseCase
  implements UseCasePromise<null, Model>
{
  constructor(private _modeloRepository: ModeloRepository) {}

  execute(bodyrequest: PostModeloRequest): Promise<Model> {
    return this._modeloRepository.postModelo(bodyrequest);
  }
}
