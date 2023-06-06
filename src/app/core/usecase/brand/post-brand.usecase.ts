import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Brand } from '../../models/all/response/all-responses.response';
import { PostBrandRequest } from '../../models/all/request/all-requests.request';
import { BrandRepository } from '../../repository/brand/brand.repository';

@Injectable({
  providedIn: 'root',
})
export class PostBrandUseCase
  implements UseCasePromise<null, Brand>
{
  constructor(private _brandRepository:BrandRepository) {}

  execute(bodyrequest: PostBrandRequest): Promise<Brand> {
    return this._brandRepository.postBrand(bodyrequest);
  }
}
