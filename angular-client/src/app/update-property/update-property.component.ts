import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../_models/property';
import {State} from '../_models/state';
import {City} from '../_models/city';
import {PropertyService} from '../_services/property.service';
import { StateService } from '../_services/state.service';
import { CityService } from '../_services/city.service';
@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.scss']
})
export class UpdatePropertyComponent implements OnInit {
  propertyId?: number;
  property: Property = new Property();
  states: State[] = [];
  cities: City[] = [];
  stateSelected = false;

  constructor(private route: ActivatedRoute,private propertyService: PropertyService,private stateService: StateService,private cityService: CityService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.propertyId = params['propertyId'];
      if (this.propertyId !== undefined) {
        this.getPropertyDetails(this.propertyId);
        
      }
    });
    this.stateService.getStates().subscribe((data: State[]) => {
      this.states = data;
    });
    
  }
  onStateChange(event: any) {
   
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

  getPropertyDetails(propertyId: number): void {
    this.propertyService.getProperty(propertyId).subscribe(property => {
      this.property = property;
    });
  }

  updateProperty() {
    // Update the property using a service or API call
    // Example implementation assuming you have a property service
 //   this.propertyService.updateProperty(this.property);
  }
}
