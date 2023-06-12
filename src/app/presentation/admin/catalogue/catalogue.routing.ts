import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ManageCatalogueComponent } from "./manage-catalogue/manage-catalogue.component";

const routes: Routes = [

    { path: '', component: ManageCatalogueComponent, },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CatalogueRoutingModule { }