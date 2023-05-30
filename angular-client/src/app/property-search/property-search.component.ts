import { Component } from '@angular/core';
import {Property} from '../_models/property';
import {State} from '../_models/state';
import {City} from '../_models/city';

import {PropertyService} from '../_services/property.service';
import { StateService } from '../_services/state.service';
import { CityService } from '../_services/city.service';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.scss']
})
export class PropertySearchComponent {
  selected ="sale"
  states: State[] = [];
  cities: City[] = [];
  stateSelected = false;

  constructor(private stateService: StateService,private cityService: CityService){}

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
  }
  sliderValue: number = 300;

  formatSliderValue(value: number): string {
    return `Value: ${value}`;
  }
  
  onSliderChange(event: any): void {
    this.sliderValue = event.value;
  }
  
}
