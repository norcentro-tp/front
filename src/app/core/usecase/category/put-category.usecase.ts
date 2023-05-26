import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Category } from '../../models/inventory/response/get-all-inventory.response';
import {  PutCategoryRequest } from '../../models/inventory/request/post-moto.request';
import { CategoryRepository } from '../../repository/category/category.repository';

@Injectable({
  providedIn: 'root',
})
export class PutCategoryUseCase
  implements
    UseCasePromise<PutCategoryRequest,Category>
{
  constructor(private _categoryRepository: CategoryRepository) {}

  execute(request: PutCategoryRequest): Promise<Category> {
    
    return this._categoryRepository.putCategory(request);
  }
}
