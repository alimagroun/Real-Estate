import { Component, OnInit } from '@angular/core';
import {PropertyService} from '../_services/property.service';
import{PropertyProjection} from "../_models/PropertyProjection";
import {Page} from '../_models/page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites!: Page<PropertyProjection>;
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private propertyService: PropertyService,private router: Router) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites(): void {
    this.propertyService.findFavoritesProperties(this.pageIndex, this.pageSize)
      .subscribe((favorites: Page<PropertyProjection>) => {
        this.favorites = favorites;
      });
  }
  viewPropertyDetails(propertyId: number): void {
    this.router.navigate(['/property', propertyId]);
  }
}
