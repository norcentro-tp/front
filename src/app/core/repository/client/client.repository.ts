import {
  Client,
  GetAllClientResponse,
} from '../../models/all/response/all-responses.response';
import {
  PostClientRequest,
  PutClientRequest,
} from '../../models/all/request/all-requests.request';

export abstract class ClientRepository {
  abstract getClientById(id: string): Promise<Client | null>;

  abstract getAllClient(): Promise<Client[]>;

  abstract postClient(
    bodyRequest: PostClientRequest
  ): Promise<GetAllClientResponse>;

  abstract putClient(
    id: string,
    bodyRequest: PutClientRequest
  ): Promise<GetAllClientResponse>;

  abstract deleteClient(id: string): Promise<void>;
}
