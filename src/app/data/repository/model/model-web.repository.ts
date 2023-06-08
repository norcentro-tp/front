import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MODEL_URL } from 'src/app/shared/helpers/constants/url.constants';
import { Model } from 'src/app/core/models/all/response/all-responses.response';
import { ModelRepository } from 'src/app/core/repository/model/model.repository';
import { PostModelRequest, PutModelRequest } from 'src/app/core/models/all/request/all-requests.request';

@Injectable({
  providedIn: 'root'
})

export class ModelWebRepository extends ModelRepository {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getAllModels(): Promise<Model[]> {

    const url = `${MODEL_URL}`

    return lastValueFrom(this.http.get<Model[]>(url))
  }
  postModel(
    bodyRequest: PostModelRequest
  ): Promise<Model> {
    const url = `${MODEL_URL}`;
    return lastValueFrom(
      this.http.post<Model>(url, bodyRequest)
    );
  }

  putModel(
    request: PutModelRequest
  ): Promise<Model | null> {
    const formData = new FormData();
    const keys = Object.keys(request);

    keys.forEach((key) => {
      formData.append(key, request[key]);
    });
    const url = `${MODEL_URL}/${request.id}`;
    return lastValueFrom(
      this.http.put<Model>(url, formData)
    );
  }
  getModelById(id: string): Promise<Model | null> {
    const url = `${MODEL_URL}/${id}`;
    return lastValueFrom(this.http.get<Model>(url));
  }

  deleteModel(id: string): Promise<void> {
    const url = `${MODEL_URL}/${id}`;
    return lastValueFrom(this.http.delete<void>(url));
  }

  updateCatalogue(id: string): Promise<Model | null> {
    const url = `${MODEL_URL}/${id}/updateCatalogue`;
    return lastValueFrom(this.http.put<Model>(url, null));
  }
}


