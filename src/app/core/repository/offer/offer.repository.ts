import {
  Offer,
  GetAllOfferResponse,
} from '../../models/all/response/all-responses.response';
import {
  PostOfferRequest,
  PutOfferRequest,
} from '../../models/all/request/all-requests.request';

export abstract class OfferRepository {
  abstract getOfferById(id: string): Promise<Offer | null>;

  abstract getAllOffer(): Promise<Offer[]>;

  abstract postOffer(
    bodyRequest: PostOfferRequest
  ): Promise<GetAllOfferResponse>;

  abstract putOffer(
    id: string,
    bodyRequest: PutOfferRequest
  ): Promise<GetAllOfferResponse>;

  abstract deleteOffer(id: string): Promise<void>;
}
