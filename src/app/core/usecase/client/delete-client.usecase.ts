import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { SupplierRepository } from '../../repository/supplier/supplier.repository';
import { ClientRepository } from '../../repository/client/client.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteClientUseCase
  implements UseCasePromise<string,void>
{
  constructor(private _clientRepository: ClientRepository) {}

  execute(id: string): Promise<void> {
    return this._clientRepository.deleteClient(id);
  }
}