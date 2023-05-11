import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import {
  InventoryItemResponse,
  SupplierItemResponse,
} from '../../models/inventory/response/get-all-inventory.response';
import { SupplierRepository } from '../../repository/supplier/supplier.repository';

@Injectable({
  providedIn: 'root',
})
export class GetSupplierByIdUseCase
  implements UseCasePromise<string, SupplierItemResponse | null>
{
  constructor(private _supplierRepository: SupplierRepository) {}

  execute(id: string): Promise<SupplierItemResponse | null> {
    return this._supplierRepository.getSupplierById(id);
  }
}
