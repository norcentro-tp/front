import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { CategoryRepository } from '../../repository/category/category.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteCategoryUseCase
  implements UseCasePromise<string,void>
{
  constructor(private _categoryRepository: CategoryRepository) {}

  execute(id: string): Promise<void> {
    return this._categoryRepository.deleteCategory(id);
  }
}