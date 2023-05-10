import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Brand, Category, GetAllInventoryResponse, Supplier } from '../../models/inventory/response/get-all-inventory.response';
import { CategoryRepository } from '../../repository/category/category.repository';
import { BrandRepository } from '../../repository/brand/category.repository';
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