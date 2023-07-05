import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Category } from '../../models/all/response/all-responses.response';
import { PostCategoryRequest } from '../../models/all/request/all-requests.request';
import { CategoryRepository } from '../../repository/category/category.repository';

@Injectable({
  providedIn: 'root',
})
export class PostCategoryUseCase
  implements UseCasePromise<null, Category>
{
  constructor(private _categoryRepository:CategoryRepository) {}

  execute(bodyrequest: PostCategoryRequest): Promise<Category> {
    return this._categoryRepository.postCategory(bodyrequest);
  }
}
