import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Model } from '../../models/all/response/all-responses.response';
import { ModelRepository } from '../../repository/model/model.repository';

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