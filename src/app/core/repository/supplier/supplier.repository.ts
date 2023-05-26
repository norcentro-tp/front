import {
  GetAllSupplierResponse,
  Supplier,
  SupplierItemResponse,
} from '../../models/inventory/response/get-all-inventory.response';
import {
  PostSupplierRequest,
  PutSupplierRequest,
} from '../../models/inventory/request/post-moto.request';

export abstract class SupplierRepository {
  abstract getSupplierById(id: string): Promise<SupplierItemResponse | null>;

  abstract getAllSuppliers(): Promise<Supplier[]>;

  abstract postSupplier(
    bodyRequest: PostSupplierRequest
  ): Promise<GetAllSupplierResponse>;

  abstract putSupplier(
    id: string,
    bodyRequest: PutSupplierRequest
  ): Promise<GetAllSupplierResponse>;

  abstract deleteSupplier(id: string): Promise<void>;
}
