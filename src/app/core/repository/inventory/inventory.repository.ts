import { 
  PostInventoryRequest,
  PutInventoryRequest
 } from '../../models/inventory/request/post-moto.request';

import {
  GetAllInventoryResponse,
  InventoryItemResponse
} from '../../models/inventory/response/get-all-inventory.response';

export abstract class InventoryRepository {
  abstract getAllInventory(): Promise<GetAllInventoryResponse[]>;

  abstract getInventoryById(id: string): Promise<InventoryItemResponse | null>;

  abstract postMoto(
    bodyRequest: PostInventoryRequest
  ): Promise<GetAllInventoryResponse>;

  abstract putMoto(
    id: string,
    bodyRequest: PutInventoryRequest
  ): Promise<GetAllInventoryResponse>;
}
