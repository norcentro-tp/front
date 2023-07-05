import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { STATUS_URL } from 'src/app/shared/helpers/constants/url.constants';
import { Status } from 'src/app/core/models/all/response/all-responses.response';
import { StatusRepository } from 'src/app/core/repository/status/status.repository';

@Injectable({
    providedIn: 'root'
})

export class StatusWebRepository extends StatusRepository {

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    getAllStatus(): Promise<Status[]> {

        const url = `${STATUS_URL}`

        return lastValueFrom(this.http.get<Status[]>(url))
    }


}