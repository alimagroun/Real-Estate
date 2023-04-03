import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddPropertyRoutingModule } from './add-property-routing.module';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

// import { DashboardRoutingModule } from './dashboard-routing.module';
// import { DashboardComponent } from './dashboard.component';

import {AddPropertyComponent} from './add-property.component';

import { WidgetsModule } from '../views/widgets/widgets.module';


@NgModule({
  declarations: [AddPropertyComponent],
  imports: [
    CommonModule,
    AddPropertyRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule
  ]
})
export class AddPropertyModule { }
