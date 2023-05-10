import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Category, Model, Status } from '../../models/inventory/response/get-all-inventory.response';
import { ModelRepository } from '../../repository/modelo/model.repository';
import { StatusRepository } from '../../repository/status/status.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllStatusUseCase implements UseCasePromise<null, Status[]> {

    constructor(
        private _StatusRepository: StatusRepository
    ) { }

    execute(): Promise<Status[]> {
        return this._StatusRepository.getAllStatus()
    }
}