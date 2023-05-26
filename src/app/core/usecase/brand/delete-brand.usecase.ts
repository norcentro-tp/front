import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { BrandRepository } from '../../repository/brand/brand.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteBrandUseCase
  implements UseCasePromise<string,void>
{
  constructor(private _brandRepository: BrandRepository) {}

  execute(id: string): Promise<void> {
    return this._brandRepository.deleteBrand(id);
  }
}