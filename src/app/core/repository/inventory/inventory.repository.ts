import {
  GetAllInventoryResponse,
  PostInventoryRequest,
} from '../../models/inventory/response/get-all-inventory.response';

export abstract class InventoryRepository {
  abstract getAllInventory(): Promise<GetAllInventoryResponse[]>;

  abstract postMoto(
    bodyRequest: PostInventoryRequest
  ): Promise<GetAllInventoryResponse>;
}
