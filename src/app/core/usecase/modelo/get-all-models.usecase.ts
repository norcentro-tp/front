import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Category, Model } from '../../models/inventory/response/get-all-inventory.response';
import { ModelRepository } from '../../repository/modelo/model.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllModelsUseCase implements UseCasePromise<null, Model[]> {

    constructor(
        private _ModelRepository: ModelRepository
    ) { }

    execute(): Promise<Model[]> {
        return this._ModelRepository.getAllModels()
    }
}