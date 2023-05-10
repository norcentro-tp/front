import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllInventoryResponse } from '../../models/inventory/response/get-all-inventory.response';
import { InventoryRepository } from '../../repository/inventory/inventory.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllInventoryUseCase implements UseCasePromise<null, GetAllInventoryResponse[]> {

    constructor(
        private _inventoryRepository: InventoryRepository
    ) { }

    execute(): Promise<GetAllInventoryResponse[]> {

        return this._inventoryRepository.getAllInventory()
    }
}