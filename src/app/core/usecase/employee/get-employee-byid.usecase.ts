import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Employee, SupplierItemResponse } from '../../models/all/response/all-responses.response';
import { SupplierRepository } from '../../repository/supplier/supplier.repository';
import { EmployeeRepository } from '../../repository/employee/employee.repository';

@Injectable({
  providedIn: 'root',
})
export class GetEmployeeByIdUseCase
  implements UseCasePromise<string, Employee | null>
{
  constructor(private _employeeRepository: EmployeeRepository) {}

  execute(id: string): Promise<Employee | null> {
    return this._employeeRepository.getEmployeeById(id);
  }
}
