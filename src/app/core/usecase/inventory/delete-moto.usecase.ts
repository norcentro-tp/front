import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { InventoryRepository } from '../../repository/inventory/inventory.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteMotoUseCase
  implements UseCasePromise<string,void>
{
  constructor(private _inventoryRepository: InventoryRepository) {}

  execute(id: string): Promise<void> {
    return this._inventoryRepository.deleteMoto(id);
  }
}