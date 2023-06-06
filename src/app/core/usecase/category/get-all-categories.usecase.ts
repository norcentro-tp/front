import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Category } from '../../models/all/response/all-responses.response';
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