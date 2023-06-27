import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CampaingRoutingModule } from './campaing.routing';
import { DropdownModule } from 'primeng/dropdown';
import { RegisterCampaingComponent } from './register-campaing/register-campaing.component';
import { ManageCampaingComponent } from './manage-campaing/manage-campaing.component';
import { UpdateCampaingComponent } from './update-campaing/update-campaing.component';
import { VisualizeCampaingComponent } from './visualize-campaing/visualize-campaing.component';

const COMPONENTS = [
  ManageCampaingComponent,
  RegisterCampaingComponent,
  VisualizeCampaingComponent,
  UpdateCampaingComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    SharedModule,
    CampaingRoutingModule,
    DropdownModule
  ],
  providers: [],
})
export class CampaingModule {}
