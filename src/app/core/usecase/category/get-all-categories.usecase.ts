import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Category, GetAllInventoryResponse } from '../../models/inventory/response/get-all-inventory.response';
import { InventoryRepository } from '../../repository/inventory/inventory.repository';
import { CategoryRepository } from '../../repository/category/category.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllCategoriesUseCase implements UseCasePromise<null, Category[]> {

    constructor(
        private _CategoryRepository: CategoryRepository
    ) { }

    execute(): Promise<Category[]> {
        return this._CategoryRepository.getAllCategories()
    }
}