import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Property} from '../_models/property';
import {State} from '../_models/state';
import {City} from '../_models/city';
import{PropertyFilter} from '../_models/propertyFilter';

import {PropertyService} from '../_services/property.service';
import { StateService } from '../_services/state.service';
import { CityService } from '../_services/city.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.scss']
})
export class PropertySearchComponent {
  states: State[] = [];
  cities: City[] = [];
  favoriteProperties: number[] = [];
  numFavorites: number =0;
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
  currentPage = 1;
  totalElements: number = 0;
  pageSize = 12;
  maxSize = 5;

  constructor(private propertyService: PropertyService,private stateService: StateService,private cityService: CityService,private route: ActivatedRoute,private router: Router,private snackBar: MatSnackBar){}

  ngOnInit() {
this.loadFavoriteProperties();
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
  loadFavoriteProperties(): void {
    this.propertyService.getFavoriteProperties().subscribe(
      (favoriteProperties) => {
        this.favoriteProperties = favoriteProperties;
        this.numFavorites = this.favoriteProperties.filter(num => num >= 1).length;
      },
      (error) => {
        console.error('Failed to load favorite properties', error);
        // Handle error here
      }
    );
  }
  isFavorite(property: any): boolean {
    const propertyId = property.id;
    return this.favoriteProperties.includes(propertyId);
  }
  toggleFavorite(property: any): void {
    const propertyId = property.id;
    const isFavorite = this.favoriteProperties.includes(propertyId);
  
    if (isFavorite) {
      // Property is a favorite, remove it from favorites
      this.propertyService.removeFromFavorites(propertyId).subscribe(
        () => {
          console.log('Property removed from favorites');
          this.favoriteProperties = this.favoriteProperties.filter(id => id !== propertyId);
          this.numFavorites--;
          this.snackBar.open('Property removed from favorites.', 'Close', { duration: 3000 });
        },
        (error) => {
          console.error('Failed to remove property from favorites', error);
          // Handle error here
        }
      );
    } else {
      // Property is not a favorite, add it to favorites
      this.propertyService.addToFavorites(propertyId).subscribe(
        () => {
          console.log('Property added to favorites');
          this.favoriteProperties.push(propertyId);
          this.numFavorites++;
          this.snackBar.open('Property added to favorites.', 'Close', { duration: 3000 });
        },
        (error) => {
          console.error('Failed to add property to favorites', error);
          // Handle error here
        }
      );
    }
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
  saveSearch() {
    const filter: PropertyFilter = {
      status: this.status,
      stateId: this.stateId,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      bedrooms: this.bedrooms,
      bathrooms: this.bathrooms,
      cityId: this.cityId
    };

    this.propertyService.saveSearch(filter)
      .subscribe(
        () => {
          // Handle success, the search was saved
          console.log('Search saved successfully');
          // You can perform any additional actions here, such as displaying a success message
        },
        (error) => {
          // Handle error, the search save operation failed
          console.error('Error saving search:', error);
          // You can perform any error handling or display error messages here
        }
      );
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
