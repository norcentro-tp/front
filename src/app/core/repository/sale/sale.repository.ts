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

  abstract postSale(bodyRequest: PostSaleRequest): Promise<Sale>;

  abstract putSale(request: PutSaleRequest): Promise<Sale>;

  abstract deleteSale(id: string): Promise<void>;
}
