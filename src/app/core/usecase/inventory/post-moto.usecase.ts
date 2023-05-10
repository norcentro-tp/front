import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllInventoryResponse } from '../../models/inventory/response/get-all-inventory.response';
import { InventoryRepository } from '../../repository/inventory/inventory.repository';
import { PostInventoryRequest } from '../../models/inventory/request/post-moto.request';

@Injectable({
  providedIn: 'root',
})
export class PostMotoUseCase
  implements UseCasePromise<null, GetAllInventoryResponse>
{
  constructor(private _inventoryRepository: InventoryRepository) {}

  execute(bodyrequest: PostInventoryRequest): Promise<GetAllInventoryResponse> {
    return this._inventoryRepository.postMoto(bodyrequest);
  }
}
