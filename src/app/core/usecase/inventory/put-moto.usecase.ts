import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllInventoryResponse } from '../../models/inventory/response/get-all-inventory.response';
import { InventoryRepository } from '../../repository/inventory/inventory.repository';
import { PutInventoryRequest } from '../../models/inventory/request/post-moto.request';

@Injectable({
  providedIn: 'root',
})
export class PutMotoUseCase
  implements UseCasePromise<{ id: string; bodyRequest: PutInventoryRequest }, GetAllInventoryResponse>
{
  constructor(private _inventoryRepository: InventoryRepository) {}

  execute({ id, bodyRequest }: { id: string; bodyRequest: PutInventoryRequest }): Promise<GetAllInventoryResponse> {
    return this._inventoryRepository.putMoto(id, bodyRequest);
  }
}
