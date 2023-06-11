import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllEmployeeResponse, GetAllSupplierResponse } from '../../models/all/response/all-responses.response';
import { PostEmployeeRequest, PostSupplierRequest } from '../../models/all/request/all-requests.request';
import { EmployeeRepository } from '../../repository/employee/employee.repository';

@Injectable({
  providedIn: 'root',
})
export class PostEmployeeUseCase
  implements UseCasePromise<null, GetAllEmployeeResponse>
{
  constructor(private _employeeRepository: EmployeeRepository) {}

  execute(bodyrequest: PostEmployeeRequest): Promise<GetAllEmployeeResponse> {
    return this._employeeRepository.postEmployee(bodyrequest);
  }
}
