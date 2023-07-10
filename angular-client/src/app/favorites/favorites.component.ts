import { Component, OnInit } from '@angular/core';
import {PropertyService} from '../_services/property.service';
import{PropertyProjection} from "../_models/PropertyProjection";
import {Page} from '../_models/page';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites!: Page<PropertyProjection>;
  pageIndex: number = 0;
  pageSize: number = 12;
  totalElements: number = 0;
  currentPage = 1;
  maxSize = 5;

  constructor(private propertyService: PropertyService,private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFavorites(this.pageIndex,this.pageSize);
  }

  getFavorites(pageIndex: number, pageSize: number): void {
    this.propertyService.findFavoritesProperties(pageIndex, pageSize)
      .subscribe((favorites: Page<PropertyProjection>) => {
        this.favorites = favorites;
        this.totalElements = favorites.totalElements;
      });
  }
  viewPropertyDetails(propertyId: number): void {
    this.router.navigate(['/property', propertyId]);
  }

  removeFromFavorites(property: any): void {
    const propertyId = property.id;
      this.propertyService.removeFromFavorites(propertyId).subscribe(
        () => {
          console.log('Property removed from favorites');
          const totalItemsOnCurrentPage = this.favorites.content.length;
          const lastPage = Math.ceil(this.totalElements / this.pageSize);
    
          if (totalItemsOnCurrentPage === 1 && this.currentPage > 1) {
            // If the current page becomes empty and it's not the first page,
            // navigate to the previous page
            this.currentPage -= 1;
          }
          this.getFavorites(this.currentPage -1,this.pageSize);
          this.snackBar.open('Property removed from favorites.', 'Close', { duration: 3000 });
        },
        (error) => {
          console.error('Failed to remove property from favorites', error);
        
        }
      );
    } 
    pageChanged(event: any): void {
      this.currentPage = event.page;
      const pageIndex = this.currentPage - 1;
      const pageSize = this.pageSize;
      this.getFavorites(pageIndex, pageSize);
    }
  }
  

