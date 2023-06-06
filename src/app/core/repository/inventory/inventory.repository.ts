import { 
  PostInventoryRequest,
  PutInventoryRequest
 } from '../../models/all/request/all-requests.request';

import {
  GetAllInventoryResponse,
  InventoryItemResponse
} from '../../models/all/response/all-responses.response';

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

  abstract deleteMoto(id: string): Promise<void>;
}
