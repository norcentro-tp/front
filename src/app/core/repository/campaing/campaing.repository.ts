import {
  Campaing,
  GetAllCampaingResponse,
} from '../../models/all/response/all-responses.response';
import {
  PostCampaingRequest,
  PutCampaingRequest,
} from '../../models/all/request/all-requests.request';

export abstract class CampaingRepository {
  abstract getCampaingById(id: string): Promise<Campaing | null>;

  abstract getAllCampaing(): Promise<Campaing[]>;

  abstract postCampaing(
    bodyRequest: PostCampaingRequest
  ): Promise<GetAllCampaingResponse>;

  abstract putCampaing(
    id: string,
    bodyRequest: PutCampaingRequest
  ): Promise<GetAllCampaingResponse>;

  abstract deleteCampaing(id: string): Promise<void>;
}
