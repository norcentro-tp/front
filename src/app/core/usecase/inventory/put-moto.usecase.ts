import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllInventoryResponse } from '../../models/all/response/all-responses.response';
import { InventoryRepository } from '../../repository/inventory/inventory.repository';
import { PutInventoryRequest } from '../../models/all/request/all-requests.request';

@Injectable({
  providedIn: 'root',
})
export class PutMotoUseCase
  implements UseCasePromise<PutInventoryRequest, GetAllInventoryResponse>
{
  constructor(private _inventoryRepository: InventoryRepository) {}

  execute( request: PutInventoryRequest): Promise<GetAllInventoryResponse> {
    return this._inventoryRepository.putMoto(request);
  }
}
