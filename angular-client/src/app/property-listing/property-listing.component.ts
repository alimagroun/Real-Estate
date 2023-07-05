import { Component , OnInit} from '@angular/core';
import {Page} from '../_models/page';
import{PropertyProjection} from "../_models/PropertyProjection";
import {PropertyService} from '../_services/property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.scss']
})
export class PropertyListingComponent  implements OnInit {
  propertiesPage: PropertyProjection[] = [];

  constructor(private propertyService: PropertyService,private router: Router) { }

  ngOnInit() {
    this.getProperties();
  }





  getProperties() {
    const page = 0; // Example page number
    const size = 10; // Example page size

    this.propertyService.getPropertiesByUserId(page, size).subscribe(
      (data) => {
        this.propertiesPage = data.content;
        console.log('Retrieved properties:', this.propertiesPage);
        // Do something with the retrieved properties
      },
      (error) => {
        console.error('Error retrieving properties:', error);
      }
    );
  }
  viewPropertyDetails(propertyId: number): void {
    this.router.navigate(['/property', propertyId]);
  }
  updateProperty(propertyId: number): void {
    this.router.navigate(['/updateproperty', propertyId]);
  }
}
