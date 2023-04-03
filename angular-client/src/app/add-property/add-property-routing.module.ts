import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AddPropertyComponent} from './add-property.component'

const routes: Routes = [
  {
    path: '',
    component: AddPropertyComponent,
    data: {
      title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPropertyRoutingModule { }
