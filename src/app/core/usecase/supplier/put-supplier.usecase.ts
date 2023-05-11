import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import {
  GetAllInventoryResponse,
  GetAllSupplierResponse,
} from '../../models/inventory/response/get-all-inventory.response';
import { InventoryRepository } from '../../repository/inventory/inventory.repository';
import {
  PutInventoryRequest,
  PutSupplierRequest,
} from '../../models/inventory/request/post-moto.request';
import { SupplierRepository } from '../../repository/supplier/supplier.repository';

@Injectable({
  providedIn: 'root',
})
export class PutSupplierUseCase
  implements
    UseCasePromise<
      { id: string; bodyRequest: PutSupplierRequest },
      GetAllSupplierResponse
    >
{
  constructor(private _supplierRepository: SupplierRepository) {}

  execute({
    id,
    bodyRequest,
  }: {
    id: string;
    bodyRequest: PutSupplierRequest;
  }): Promise<GetAllSupplierResponse> {
    return this._supplierRepository.putSupplier(id, bodyRequest);
  }
}
