import { PostModeloRequest, PutModeloRequest } from "../../models/inventory/request/post-moto.request";
import { Model } from "../../models/inventory/response/get-all-inventory.response";

export abstract class ModeloRepository {
  abstract getModeloById(id: string): Promise<Model | null>;

  abstract getAllModelo(): Promise<Model[]>;

  abstract postModelo(
    bodyRequest: PostModeloRequest
  ): Promise<Model>;

  abstract putModelo(
    id: string,
    bodyRequest: PutModeloRequest
  ): Promise<Model>;

  abstract deleteModelo(id: string): Promise<void>;
}
