import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { GetAllCategoriesUseCase } from 'src/app/core/usecase/category/get-all-categories.usecase';
import { DeleteCategoryUseCase } from 'src/app/core/usecase/category/delete-category.usecase';
import { RegisterCategoryComponent } from '../register-category/register-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-manage-category',
  templateUrl: 'manage-category.component.html',
  providers: [DialogService],
})
export class ManageCategoryComponent implements OnInit {
  lCategories: any[] = [];

  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    
    private _getAllCategory: GetAllCategoriesUseCase,
    private _deleteCategory: DeleteCategoryUseCase
  ) {}
  ref: DynamicDialogRef;
  ngOnInit() {
    this.getAllCategories();
  }

  async getAllCategories() {
    try {
      const response: Category[] = await this._getAllCategory.execute();

      console.log('CATEGORY RESPUESTA BACKEND', response);
      this.lCategories = response.reverse();
    } catch (error) {
      console.log(error);
    }
  }

  openRegisterDialog() {
    const ref = this.dialogService.open(RegisterCategoryComponent, {
      header: 'Agregar Categoria',
      width: '60rem',
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllCategories();
    });
  }

  openUpdateDialog(id:string) {
    const ref = this.dialogService.open(UpdateCategoryComponent, {
      header: 'Editar Categoria',
      width: '40rem',      
      data: {
        id: id
      }
    });    

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO')
      this.getAllCategories();
    });
}

  deleteCategory(id: string){
    try { this._confirmationService.confirm({ 
      message: "Estás seguro que desea eliminar? ",
      accept: ()=> {
        this._deleteCategory.execute(id);
        this.getAllCategories()
      },
      reject: ()=> {},
    })
      
    } catch (error) {
      
    }
}
}
