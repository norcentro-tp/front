import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllSaleResponse } from '../../models/all/response/all-responses.response';
import { PutSaleRequest } from '../../models/all/request/all-requests.request';
import { SaleRepository } from '../../repository/sale/sale.repository';

@Injectable({
  providedIn: 'root',
})
export class PutSaleUseCase
  implements
    UseCasePromise<PutSaleRequest,GetAllSaleResponse>
{
  constructor(private _saleRepository: SaleRepository) {}

  execute(request: PutSaleRequest): Promise<GetAllSaleResponse> {
    return this._saleRepository.putSale(request);
  }
}
