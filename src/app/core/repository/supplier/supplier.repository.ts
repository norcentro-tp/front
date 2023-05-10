import {
  GetAllSupplierResponse,
  Supplier,
} from '../../models/inventory/response/get-all-inventory.response';
import {
  PostSupplierRequest,
} from '../../models/inventory/request/post-moto.request';

export abstract class SupplierRepository {
  abstract getAllSuppliers(): Promise<Supplier[]>;
  abstract postSupplier(
    bodyRequest: PostSupplierRequest
  ): Promise<GetAllSupplierResponse>;
}
