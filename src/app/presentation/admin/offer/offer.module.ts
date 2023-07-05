import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfferRoutingModule } from './offer.routing';
import { DropdownModule } from 'primeng/dropdown';
import { RegisterOfferComponent } from './register-offer/register-offer.component';
import { ManageOfferComponent } from './manage-offer/manage-offer.component';
import { VisualizeOfferComponent } from './visualize-offer/visualize-offer.component';
import { UpdateOfferComponent } from './update-offer/update-offer.component';
const COMPONENTS = [
  ManageOfferComponent,
  RegisterOfferComponent,
  VisualizeOfferComponent,
  UpdateOfferComponent
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
    OfferRoutingModule,
    DropdownModule
  ],
  providers: [],
})
export class OfferModule {}
