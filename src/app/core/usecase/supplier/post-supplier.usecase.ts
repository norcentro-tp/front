import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllSupplierResponse } from '../../models/all/response/all-responses.response';
import { PostSupplierRequest } from '../../models/all/request/all-requests.request';
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
