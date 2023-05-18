import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyDetailsComponent } from './property-details.component';
import { DefaultHeaderComponent } from '../containers/default-layout/default-header/default-header.component';

const routes: Routes = [
  {
    path: '',
    component: PropertyDetailsComponent,
    children: [
      {
        path: 'header',
        component: DefaultHeaderComponent,
        outlet: 'header'
      },
      // Other child routes for the component
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyDetailsRoutingModule { }
