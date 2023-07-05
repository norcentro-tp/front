import { Model, Status } from "../../models/all/response/all-responses.response";

export abstract class StatusRepository {

    abstract getAllStatus(): Promise<Status[]>;

}