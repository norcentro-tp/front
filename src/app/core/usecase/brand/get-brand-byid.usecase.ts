import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import {
  BrandItemResponse,
} from '../../models/all/response/all-responses.response';
import { BrandRepository } from '../../repository/brand/brand.repository';

@Injectable({
  providedIn: 'root',
})
export class GetBrandByIdUseCase
  implements UseCasePromise<string, BrandItemResponse | null>
{
  constructor(private _brandRepository: BrandRepository) {}

  execute(id: string): Promise<BrandItemResponse | null> {
    return this._brandRepository.getBrandById(id);
  }
}
