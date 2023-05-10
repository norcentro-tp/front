import {
  GetAllSupplierResponse,
  PostSupplierRequest,
  Supplier,
} from '../../models/inventory/response/get-all-inventory.response';

export abstract class SupplierRepository {
  abstract getAllSuppliers(): Promise<Supplier[]>;
  abstract postSupplier(
    bodyRequest: PostSupplierRequest
  ): Promise<GetAllSupplierResponse>;
}
