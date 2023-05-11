import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { GetAllCategoriesUseCase } from 'src/app/core/usecase/category/get-all-categories.usecase';
import { RegisterInventoryComponent } from '../../inventory/register-inventory/register-inventory.component';
import { RegisterCategoryComponent } from '../register-category/register-category.component';
import { ConfirmationService } from 'primeng/api';
import { UpdateCategoryComponent } from '../update-category/update-category.component';


@Component({
  selector: 'app-manage-category',
  templateUrl: 'manage-category.component.html',
  providers: [DialogService],
})
export class ManageCategoryComponent implements OnInit {
  lCategory: Category[] = [];

  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    
    private _getAllCategory: GetAllCategoriesUseCase
  ) {}
  ref: DynamicDialogRef;
  ngOnInit() {
    this.getAllCategory();
  }

  async getAllCategory() {
    try {
      const response: Category[] =
        await this._getAllCategory.execute();

      console.log('CATEGORY RESPUESTA BACKEND', response);
      this.lCategory = response;
    } catch (error) {
      console.log(error);
    }
  }

  openDialog() {
    this.ref = this.dialogService.open(RegisterCategoryComponent, {
      header: 'Agregar category',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
    });

    this.ref.onClose.subscribe((result) => {
      this.getAllCategory();
    });
  }
  deleteCategory(id: string){
    try { this._confirmationService.confirm({ 
      message: "Estás seguro que desea eliminar? ",
      accept: ()=> {},
      reject: ()=> {},
    })
      
    } catch (error) {
      
    }
}

  openUpdateDialog(id:string) {
    const ref = this.dialogService.open(UpdateCategoryComponent, {
      header: 'Editar Categoria',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',      
      data: {
        id: id
      }
    });    

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO')
      this.getAllCategory();
    });
}
}
