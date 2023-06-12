import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Client} from '../../models/all/response/all-responses.response';
import { ClientRepository } from '../../repository/client/client.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllClientUseCase implements UseCasePromise<null, Client[]> {

    constructor(
        private _ClientRepository: ClientRepository
    ) { }

    execute(): Promise<Client[]> {
        return this._ClientRepository.getAllClient()
    }
}