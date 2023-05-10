import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import {
  GetAllInventoryResponse,
  GetAllSupplierResponse,
  PostSupplierRequest,
} from '../../models/inventory/response/get-all-inventory.response';
import { PostInventoryRequest } from '../../models/inventory/response/get-all-inventory.response';
import { SupplierRepository } from '../../repository/supplier/supplier.repository';

@Injectable({
  providedIn: 'root',
})
export class PostSupplierUseCase
  implements UseCasePromise<null, GetAllSupplierResponse>
{
  constructor(private _supplierRepository: SupplierRepository) {}

  execute(bodyrequest: PostSupplierRequest): Promise<GetAllSupplierResponse> {
    return this._supplierRepository.postSupplier(bodyrequest);
  }
}
