import { PostInventoryRequest } from '../../models/inventory/request/post-moto.request';
import {
  GetAllInventoryResponse
} from '../../models/inventory/response/get-all-inventory.response';

export abstract class InventoryRepository {
  abstract getAllInventory(): Promise<GetAllInventoryResponse[]>;

  abstract postMoto(
    bodyRequest: PostInventoryRequest
  ): Promise<GetAllInventoryResponse>;
}
