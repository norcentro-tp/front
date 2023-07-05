import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { SupplierRepository } from '../../repository/supplier/supplier.repository';
import { EmployeeRepository } from '../../repository/employee/employee.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteEmployeeUseCase
  implements UseCasePromise<string,void>
{
  constructor(private _employeeRepository: EmployeeRepository) {}

  execute(id: string): Promise<void> {
    return this._employeeRepository.deleteEmployee(id);
  }
}