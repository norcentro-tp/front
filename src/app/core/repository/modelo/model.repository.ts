import { Model } from "../../models/inventory/response/get-all-inventory.response";

export abstract class ModelRepository {

    abstract getAllModels(): Promise<Model[]>;

}