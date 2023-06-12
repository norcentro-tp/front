import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllEmployeeResponse } from 'src/app/core/models/all/response/all-responses.response';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetAllEmployeeUseCase } from 'src/app/core/usecase/employee/get-all-employee.usecase';
import { RegisterEmployeeComponent } from '../register-employee/register-employee.component';
import { DeleteEmployeeUseCase } from 'src/app/core/usecase/employee/delete-employee.usecase';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { VisualizeEmployeeComponent } from '../visualize-employee/visualize-employee.component';

@Component({
  selector: 'app-manage-employee',
  templateUrl: 'manage-employee.component.html',
  providers: [DialogService],
})
export class ManageEmployeeComponent implements OnInit {
  lEmployee: any[] = [];
  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,
    private _getAllEmployee: GetAllEmployeeUseCase,
    private _deleteEmployee: DeleteEmployeeUseCase
  ) {}
  ref: DynamicDialogRef;

  ngOnInit() {
    this.getAllEmployee();
  }
  async getAllEmployee() {
    try {
      const response: GetAllEmployeeResponse[] =
        await this._getAllEmployee.execute();

      console.log('Empleado RESPUESTA BACKEND', response);
      this.lEmployee = response.reverse();
    } catch (error) {
      console.log(error);
    }
  }

  openRegister() {
    const ref = this.dialogService.open(RegisterEmployeeComponent, {
      header: 'Agregar Empleado',
      width: '60rem',
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllEmployee();
    });
  }

  openUpdateDialog(id: string) {
    const ref = this.dialogService.open(UpdateEmployeeComponent, {
      header: 'Editar Empleado',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllEmployee();
    });
  }
  openVisualizeDialog(id: string) {
    const ref = this.dialogService.open(VisualizeEmployeeComponent, {
      header: 'Visualizar Empleado',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllEmployee();
    });
  }
  deleteEmployee(id: string) {
    try {
      this._confirmationService.confirm({
        message: 'Estás seguro que desea eliminar? ',
        accept: () => {
          this._deleteEmployee.execute(id).then(() => {
            this.getAllEmployee();
            this._alertService.success('Se elimino el cliente seleccionado');
          });
        },
        reject: () => {},
      });
    } catch (error) {}
  }
}
