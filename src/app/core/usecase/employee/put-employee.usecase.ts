import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { GetAllEmployeeResponse, GetAllSupplierResponse } from '../../models/all/response/all-responses.response';
import { PutEmployeeRequest, PutSupplierRequest } from '../../models/all/request/all-requests.request';
import { SupplierRepository } from '../../repository/supplier/supplier.repository';
import { EmployeeRepository } from '../../repository/employee/employee.repository';

@Injectable({
  providedIn: 'root',
})
export class PutEmployeeUseCase
  implements
    UseCasePromise<
      { id: string; bodyRequest: PutEmployeeRequest },
      GetAllEmployeeResponse
    >
{
  constructor(private _employeeRepository: EmployeeRepository) {}

  execute({
    id,
    bodyRequest,
  }: {
    id: string;
    bodyRequest: PutEmployeeRequest;
  }): Promise<GetAllEmployeeResponse> {
    return this._employeeRepository.putEmployee(id, bodyRequest);
  }
}
