import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllSupplierResponse } from '../../models/all/response/all-responses.response';
import { PutSupplierRequest } from '../../models/all/request/all-requests.request';
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
