import { Component } from '@angular/core';

import {Property} from '../_models/property';
import {State} from '../_models/state';
import {City} from '../_models/city';

import {PropertyService} from '../_services/property.service';
import { StateService } from '../_services/state.service';
import { CityService } from '../_services/city.service';




@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})

export class AddPropertyComponent {
  newProperty: Property = new Property();
  files: any[] = [];
  states: State[] = [];
  cities: City[] = [];
  stateSelected = false;

  constructor(private propertyService: PropertyService,private stateService: StateService,private cityService: CityService) {}

  ngOnInit() {
    this.stateService.getStates().subscribe((data: State[]) => {
      this.states = data;
    });
  }
  onStateChange(event: any) {
    // Retrieve selected state
   
    const selectedStateId = event.target.value;

      // Check if selectedStateId is not undefined
  if (selectedStateId !== undefined) {
  
    // Call the getCitiesByState() method from your CityService to get cities based on stateId
    this.cityService.getCitiesByState(selectedStateId)
      .subscribe(cities => {
        this.cities = cities; // Update the cities array with retrieved cities
                  // Set the flag to true when a state is selected
                  this.stateSelected = true;
      });
  }
  }
  onSubmit() {
    
   
      if (!this.files || this.files.length === 0) {
        alert('Please upload at least one photo.');
        return;
      }


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
