import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyDetailsRoutingModule } from './property-details-routing.module';
import { PropertyDetailsComponent } from './property-details.component';
import { MatCardModule } from '@angular/material/card';




@NgModule({
  declarations: [PropertyDetailsComponent],
  imports: [
    CommonModule,
    PropertyDetailsRoutingModule,
    MatCardModule
  ]
})
export class PropertyDetailsModule { }
