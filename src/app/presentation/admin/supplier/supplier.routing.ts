import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ManageSupplierComponent } from "./manage-supplier/manage-supplier.component";

const routes: Routes = [

    { path: '', component: ManageSupplierComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SupplierRoutingModule { }