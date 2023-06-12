import { Injectable } from '@angular/core';
import { UseCasePromise } from 'src/app/core/base/use-case-promise';
import { Employee} from '../../models/all/response/all-responses.response';
import { EmployeeRepository } from '../../repository/employee/employee.repository';

@Injectable({
    providedIn: 'root'
})

export class GetAllEmployeeUseCase implements UseCasePromise<null, Employee[]> {

    constructor(
        private _employeeRepository: EmployeeRepository
    ) { }

    execute(): Promise<Employee[]> {
        return this._employeeRepository.getAllEmployee()
    }
}