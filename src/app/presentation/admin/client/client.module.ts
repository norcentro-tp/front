import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientRoutingModule } from './client.routing';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { VisualizeClientComponent } from './visualize-client/visualize-client.component';

const COMPONENTS = [
  ManageClientComponent,
  RegisterClientComponent,
  UpdateClientComponent,
  VisualizeClientComponent,
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
    ClientRoutingModule,
  ],
  providers: [],
})
export class ClientModule {}
