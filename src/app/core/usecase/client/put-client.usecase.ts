import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllClientResponse, GetAllSupplierResponse } from '../../models/all/response/all-responses.response';
import { PutClientRequest, PutSupplierRequest } from '../../models/all/request/all-requests.request';
import { SupplierRepository } from '../../repository/supplier/supplier.repository';
import { ClientRepository } from '../../repository/client/client.repository';

@Injectable({
  providedIn: 'root',
})
export class PutClientUseCase
  implements
    UseCasePromise<
      { id: string; bodyRequest: PutClientRequest },
      GetAllClientResponse
    >
{
  constructor(private _clientRepository: ClientRepository) {}

  execute({
    id,
    bodyRequest,
  }: {
    id: string;
    bodyRequest: PutClientRequest;
  }): Promise<GetAllClientResponse> {
    return this._clientRepository.putClient(id, bodyRequest);
  }
}
