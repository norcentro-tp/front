import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import {
  Brand,
  Category,
  GetAllInventoryResponse,
  GetAllSupplierResponse,
} from '../../models/inventory/response/get-all-inventory.response';
import { InventoryRepository } from '../../repository/inventory/inventory.repository';
import {
  PutBrandRequest,
  PutCategoryRequest,
  PutInventoryRequest,
  PutSupplierRequest,
} from '../../models/inventory/request/post-moto.request';
import { SupplierRepository } from '../../repository/supplier/supplier.repository';
import { BrandRepository } from '../../repository/brand/brand.repository';
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
