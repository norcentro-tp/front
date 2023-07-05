import {
  Employee,
  GetAllEmployeeResponse,
} from '../../models/all/response/all-responses.response';
import {
  PostEmployeeRequest,
  PutEmployeeRequest,
} from '../../models/all/request/all-requests.request';

export abstract class EmployeeRepository {
  abstract getEmployeeById(id: string): Promise<Employee | null>;

  abstract getAllEmployee(): Promise<Employee[]>;

  abstract postEmployee(
    bodyRequest: PostEmployeeRequest
  ): Promise<GetAllEmployeeResponse>;

  abstract putEmployee(
    id: string,
    bodyRequest: PutEmployeeRequest
  ): Promise<GetAllEmployeeResponse>;

  abstract deleteEmployee(id: string): Promise<void>;
}
