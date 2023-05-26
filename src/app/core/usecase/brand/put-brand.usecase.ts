import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Brand } from '../../models/inventory/response/get-all-inventory.response';
import { PutBrandRequest } from '../../models/inventory/request/post-moto.request';
import { BrandRepository } from '../../repository/brand/brand.repository';

@Injectable({
  providedIn: 'root',
})
export class PutBrandUseCase
  implements
    UseCasePromise<PutBrandRequest,Brand>
{
  constructor(private _brandRepository: BrandRepository) {}

  execute(request: PutBrandRequest): Promise<Brand> {
    
    return this._brandRepository.putBrand(request);
  }
}
