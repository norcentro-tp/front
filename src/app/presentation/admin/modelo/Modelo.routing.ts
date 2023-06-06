import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ManageModeloComponent } from "./manage-modelo/manage-modelo.component";

const routes: Routes = [

    { path: '', component: ManageModeloComponent, },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ModeloRoutingModule { }