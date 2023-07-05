import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllSaleResponse,  } from '../../models/all/response/all-responses.response';
import { PostSaleRequest } from '../../models/all/request/all-requests.request';
import { SaleRepository } from '../../repository/sale/sale.repository';

@Injectable({
  providedIn: 'root',
})
export class PostSaleUseCase
  implements UseCasePromise<null, GetAllSaleResponse>
{
  constructor(private _saleRepository: SaleRepository) {}

  execute(bodyrequest: PostSaleRequest): Promise<GetAllSaleResponse> {
    return this._saleRepository.postSale(bodyrequest);
  }
}
