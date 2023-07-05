import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { CategoryItemResponse} from '../../models/all/response/all-responses.response';
import { CategoryRepository } from '../../repository/category/category.repository';

@Injectable({
  providedIn: 'root',
})
export class GetCategoryByIdUseCase
  implements UseCasePromise<string, CategoryItemResponse | null>
{
  constructor(private _categoryRepository: CategoryRepository) {}

  execute(id: string): Promise<CategoryItemResponse | null> {
    return this._categoryRepository.getCategoryById(id);
  }
}
