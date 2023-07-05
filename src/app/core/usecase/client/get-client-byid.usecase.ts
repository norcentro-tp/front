import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Client } from '../../models/all/response/all-responses.response';
import { ClientRepository } from '../../repository/client/client.repository';

@Injectable({
  providedIn: 'root',
})
export class  GetClientByIdUseCase
  implements UseCasePromise<string, Client | null>
{
  constructor(private _clientRepository: ClientRepository) {}

  execute(id: string): Promise<Client | null> {
    return this._clientRepository.getClientById(id);
  }
}
