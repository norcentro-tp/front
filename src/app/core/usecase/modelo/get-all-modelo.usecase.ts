import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Category, Model } from '../../models/inventory/response/get-all-inventory.response';
import { ModeloRepository } from '../../repository/modelo/modelo.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllModeloUseCase implements UseCasePromise<null, Model[]> {

    constructor(
        private _ModeloRepository: ModeloRepository
    ) { }

    execute(): Promise<Model[]> {
        return this._ModeloRepository.getAllModelo()
    }
}