import { Model, Status } from "../../models/inventory/response/get-all-inventory.response";

export abstract class StatusRepository {

    abstract getAllStatus(): Promise<Status[]>;

}