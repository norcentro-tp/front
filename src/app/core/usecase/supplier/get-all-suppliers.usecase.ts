import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Supplier } from '../../models/all/response/all-responses.response';
import { SupplierRepository } from '../../repository/supplier/supplier.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllSuppliersUseCase implements UseCasePromise<null, Supplier[]> {

    constructor(
        private _SupplierRepository: SupplierRepository
    ) { }

    execute(): Promise<Supplier[]> {
        return this._SupplierRepository.getAllSuppliers()
    }
}