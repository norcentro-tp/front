import { Supplier } from "../../models/inventory/response/get-all-inventory.response";

export abstract class SupplierRepository {

    abstract getAllSuppliers(): Promise<Supplier[]>;

}