import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { BrandRepository } from '../../repository/brand/brand.repository';
import { Brand } from '../../models/inventory/response/get-all-inventory.response';

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