import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PropertyService} from '../_services/property.service';
import { Property } from '../_models/property';
import{Photo} from '../_models/photo';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  property?: Property;
  propertyId?: number;
  photos: Photo[] = [];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.propertyId = params['propertyId'];
      if (this.propertyId !== undefined) {
        this.getPropertyDetails(this.propertyId);
      }
    });
  }

  getPropertyDetails(propertyId: number): void {
    this.propertyService.getProperty(propertyId).subscribe(property => {
      this.property = property;
      this.propertyService.getPhotos(propertyId).subscribe(photos => {
        if (this.property) {
          this.property.photos = photos;
        }
      });
    });
  }
}
