import { GetAllInventoryResponse } from "../../models/inventory/response/get-all-inventory.response";

export abstract class InventoryRepository {

    abstract getAllInventory(): Promise<GetAllInventoryResponse[]>;
    
}