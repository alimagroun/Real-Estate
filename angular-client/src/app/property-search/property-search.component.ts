import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
  max: number[] = [90000, 180000, 250000, 350000, 450000, 500000, 600000];
  status ="sale";
  stateId: number | undefined;
  minPrice: number| undefined;
  maxPrice: number| undefined;
  bedrooms: number| undefined;
  bathrooms: number| undefined;
  cityId: number | undefined;

  constructor(private propertyService: PropertyService,private stateService: StateService,private cityService: CityService,private route: ActivatedRoute,private router: Router){}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.stateId = +params['stateId'];
      if (this.stateId !== undefined) 
      {      this.cityService.getCitiesByState(this.stateId)
        .subscribe(cities => {
          this.cities = cities;
          this.stateSelected = true;
        });
        this.stateSelected=true;}
      this.status = params['status'];
      this.cityId = +params['cityId'];
      this.applyFilter(0,12);
    });
    this.stateService.getStates().subscribe((data: State[]) => {
      this.states = data;
    });
  }
  onStateChange(event: any) {
    this.stateId = event.value;
    if (this.stateId !== undefined) {
      this.cityService.getCitiesByState(this.stateId)
        .subscribe(cities => {
          this.cities = cities;
          this.stateSelected = true;
        });
    }
    this.cityId = undefined;
    this.applyFilter(0,12);
  }
 

  applyFilter(pageIndex: number, pageSize: number) {
    const filter: PropertyFilter = {
      status: this.status,
      stateId: this.stateId,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      bedrooms:this.bedrooms,
      bathrooms:this.bathrooms,
      cityId:this.cityId
    };
    console.log('State ID:'+filter.stateId+filter.minPrice+filter.maxPrice);
    this.propertyService.getPropertiesByFilter(filter,pageIndex, pageSize)
    .subscribe(page => {
      this.totalElements = page.totalElements;
      this.properties = page.content;
      this.properties.forEach(property => {
        this.propertyService.getFirstPhotoByPropertyId(property.id)
          .subscribe(photo => property.photos = [photo]);
      });
    });
  
  }
  currentPage = 1;
  totalElements: number = 0;
  pageSize = 12;
  maxSize = 5;
  pageChanged(event: any): void {
    this.currentPage = event.page;
    const pageIndex = this.currentPage - 1;
    const pageSize = this.pageSize;
    this.applyFilter(pageIndex, pageSize);
  }
  viewPropertyDetails(propertyId: number): void {
    this.router.navigate(['/property', propertyId]);
  }
}
