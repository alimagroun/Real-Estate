import { Component } from '@angular/core';

import {Property} from '../_models/property';
import {State} from '../_models/state';

import {PropertyService} from '../_services/property.service';
import { StateService } from '../_services/state.service';




@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})

export class AddPropertyComponent {
  newProperty: Property = new Property();
  files: any[] = [];
  states: State[] = [];

  constructor(private propertyService: PropertyService,private stateService: StateService) {}

  ngOnInit() {
    this.stateService.getStates().subscribe((data: State[]) => {
      this.states = data;
    });
  }
  
  onSubmit() {
    this.propertyService.createProperty(this.newProperty, this.files)
      .subscribe(
        (data) => {
          console.log('Property created successfully!', data);
        },
        (error) => {
          console.error('Error creating property', error);
        }
      );
  }

  onFileChange(event: any) {
    this.files = event.target.files;
  }
}
