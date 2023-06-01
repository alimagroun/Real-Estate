import { Component } from '@angular/core';
import {Property} from '../_models/property';
import {State} from '../_models/state';
import {City} from '../_models/city';
import{PropertyFilter} from '../_models/propertyFilter';

import {PropertyService} from '../_services/property.service';
import { StateService } from '../_services/state.service';
import { CityService } from '../_services/city.service';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.scss']
})
export class PropertySearchComponent {
  states: State[] = [];
  cities: City[] = [];
  properties: Property[] = [];
  stateSelected = false;
  min: number[] = [0, 50000, 100000, 150000, 200000, 250000, 300000, 350000];
  max: number[] = [0, 90000, 180000, 250000, 350000, 450000, 500000, 600000];
  status ="sale";
  stateId?:number;

  constructor(private propertyService: PropertyService,private stateService: StateService,private cityService: CityService){}

  ngOnInit() {
    this.stateService.getStates().subscribe((data: State[]) => {
      this.states = data;
    });
  }
  onStateChange(event: any) {
    const selectedStateId = event.value;
    if (selectedStateId !== undefined) {
      this.cityService.getCitiesByState(selectedStateId)
        .subscribe(cities => {
          this.cities = cities;
          this.stateSelected = true;
        });
    }
    this.applyFilter();
  }


  applyFilter() {
    const filter: PropertyFilter = {
   //   status: this.selectedStatus,
      stateId: this.stateId,
   //   minPrice: this.minPrice,
  //    maxPrice: this.maxPrice,
   //   bedrooms: this.bedrooms,
   //   bathrooms: this.bathrooms,
   //   cityId: this.selectedCityId
    };
  
    this.propertyService.getPropertiesByFilter(filter)
      .subscribe(properties => {
        this.properties = properties;
      });
  }
  
  
}
