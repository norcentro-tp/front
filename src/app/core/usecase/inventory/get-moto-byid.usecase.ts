import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { InventoryItemResponse } from '../../models/all/response/all-responses.response';
import { InventoryRepository } from '../../repository/inventory/inventory.repository';

@Injectable({
  providedIn: 'root',
})
export class GetInventoryByIdUseCase
  implements UseCasePromise<string, InventoryItemResponse | null> {
  constructor(private _inventoryRepository: InventoryRepository) {}

  execute(id: string): Promise<InventoryItemResponse | null> {
    return this._inventoryRepository.getInventoryById(id);
  }
}