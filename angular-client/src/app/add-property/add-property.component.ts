import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  errorMessage: string = '';

  constructor(private propertyService: PropertyService,private stateService: StateService,private cityService: CityService,  private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit() {
    this.stateService.getStates().subscribe((data: State[]) => {
      this.states = data;
    });
  }
  onStateChange(event: any) {
    const selectedStateId = event.target.value;
  if (selectedStateId !== undefined) {
    this.cityService.getCitiesByState(selectedStateId)
      .subscribe(cities => {
        this.cities = cities;
                  this.stateSelected = true;
      });
  }
  }
  
  onSubmit() {
    
   
    if (!this.files || this.files.length === 0) {
      this.errorMessage = 'Please upload at least one photo';
      return;
    }


    this.propertyService.createProperty(this.newProperty, this.files)
      .subscribe(
        (data) => {
          this.snackBar.open('Property created successfully.', 'Close', { duration: 3000 });
          this.router.navigate(['/yourproperties']);
        },
        (error) => {
        }
      );
  }

  onFileChange(event: any) {
    this.files = event.target.files;
  }
}
