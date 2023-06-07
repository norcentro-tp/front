import { PostModelRequest, PutModelRequest } from "../../models/all/request/all-requests.request";
import { Model } from "../../models/all/response/all-responses.response";

export abstract class ModelRepository {
  abstract getModelById(id: string): Promise<Model | null>;

  abstract getAllModels(): Promise<Model[]>;

  abstract postModel(bodyRequest: PostModelRequest): Promise<Model>;

  abstract putModel(request: PutModelRequest): Promise<Model>;

  abstract deleteModel(id: string): Promise<void>;
}
