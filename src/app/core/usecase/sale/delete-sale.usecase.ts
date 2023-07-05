import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { SaleRepository,  } from '../../repository/sale/sale.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteSaleUseCase
  implements UseCasePromise<string,void>
{
  constructor(private _saleRepository: SaleRepository) {}

  execute(id: string): Promise<void> {
    return this._saleRepository.deleteSale(id);
  }
}