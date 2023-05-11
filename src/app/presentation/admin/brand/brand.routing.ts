import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ManageBrandComponent } from "./manage-brand/manage-brand.component";


const routes: Routes = [

    { path: '', component: ManageBrandComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BrandRoutingModule { }