import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ManageCampaingComponent } from "./manage-campaing/manage-campaing.component";

const routes: Routes = [

    { path: '', component: ManageCampaingComponent, },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CampaingRoutingModule { }