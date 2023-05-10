import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Brand, Category, GetAllInventoryResponse } from '../../models/inventory/response/get-all-inventory.response';
import { CategoryRepository } from '../../repository/category/category.repository';
import { BrandRepository } from '../../repository/brand/category.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllBrandsUseCase implements UseCasePromise<null, Brand[]> {

    constructor(
        private _BrandRepository: BrandRepository
    ) { }

    execute(): Promise<Brand[]> {
        return this._BrandRepository.getAllBrands()
    }
}