import {
  Sale,
  GetAllSaleResponse,
} from '../../models/all/response/all-responses.response';
import {
  PostSaleRequest,
  PutSaleRequest,
} from '../../models/all/request/all-requests.request';

export abstract class SaleRepository {
  abstract getSaleById(id: string): Promise<Sale | null>;

  abstract getAllSale(): Promise<Sale[]>;

  abstract postSale(
    bodyRequest: PostSaleRequest
  ): Promise<GetAllSaleResponse>;

  abstract putSale(
    id: string,
    bodyRequest: PutSaleRequest
  ): Promise<GetAllSaleResponse>;

  abstract deleteSale(id: string): Promise<void>;
}
