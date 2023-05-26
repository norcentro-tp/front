import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { SupplierRepository } from '../../repository/supplier/supplier.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteSupplierUseCase
  implements UseCasePromise<string,void>
{
  constructor(private _supplierRepository: SupplierRepository) {}

  execute(id: string): Promise<void> {
    return this._supplierRepository.deleteSupplier(id);
  }
}