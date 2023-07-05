import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Sale } from '../../models/all/response/all-responses.response';
import { SaleRepository } from '../../repository/sale/sale.repository';

@Injectable({
  providedIn: 'root',
})
export class GetSaleByIdUseCase
  implements UseCasePromise<string, Sale | null>
{
  constructor(private _saleRepository: SaleRepository) {}

  execute(id: string): Promise<Sale | null> {
    return this._saleRepository.getSaleById(id);
  }
}
