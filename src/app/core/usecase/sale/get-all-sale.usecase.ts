import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Sale} from '../../models/all/response/all-responses.response';
import { SaleRepository } from '../../repository/sale/sale.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllSaleUseCase implements UseCasePromise<null, Sale[]> {

    constructor(
        private _saleRepository: SaleRepository
    ) { }

    execute(): Promise<Sale[]> {
        return this._saleRepository.getAllSale()
    }
}