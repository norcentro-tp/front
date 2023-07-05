import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { EMPLOYEE_URL } from 'src/app/shared/helpers/constants/url.constants';
import {
  Employee,
  GetAllEmployeeResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import {
  PostEmployeeRequest,
  PutEmployeeRequest,
} from 'src/app/core/models/all/request/all-requests.request';
import { EmployeeRepository } from 'src/app/core/repository/employee/employee.repository';

@Injectable({
  providedIn: 'root',
})
export class EmployeeWebRepository extends EmployeeRepository {
  constructor(private http: HttpClient) {
    super();
  }

  getAllEmployee(): Promise<Employee[]> {
    const url = `${EMPLOYEE_URL}`;

    return lastValueFrom(this.http.get<Employee[]>(url));
  }
  postEmployee(
    bodyRequest: PostEmployeeRequest
  ): Promise<GetAllEmployeeResponse> {
    const url = `${EMPLOYEE_URL}`;
    return lastValueFrom(
      this.http.post<GetAllEmployeeResponse>(url, bodyRequest)
    );
  }

  putEmployee(
    id: string,
    bodyRequest: PutEmployeeRequest
  ): Promise<GetAllEmployeeResponse | null> {
    const url = `${EMPLOYEE_URL}/${id}`;
    return lastValueFrom(
      this.http.put<GetAllEmployeeResponse>(url, bodyRequest)
    );
  }
  getEmployeeById(id: string): Promise<Employee | null> {
    const url = `${EMPLOYEE_URL}/${id}`;
    return lastValueFrom(this.http.get<Employee>(url));
  }

  deleteEmployee(id: string): Promise<void> {
    const url = `${EMPLOYEE_URL}/${id}`;
    return lastValueFrom(this.http.delete<void>(url));
  }
}
