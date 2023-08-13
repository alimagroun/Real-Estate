import { Component,OnInit  } from '@angular/core';
import{SavedSearch} from "../_models/savedsearch";
import {PropertyService} from '../_services/property.service';
import {Page} from '../_models/page';
import { Router,Params } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.scss']
})
export class SavedSearchesComponent implements OnInit {
  savedSearches!: SavedSearch[];
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  maxSize = 5;
  pageIndex = 0;

  constructor(private  propertyService: PropertyService,private router: Router,private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSavedSearches(this.pageIndex,this.pageSize);
  }

  getSavedSearches(pageIndex: number, pageSize: number) {
    this.propertyService.getSavedSearches(pageIndex, pageSize)
      .subscribe((page: Page<SavedSearch>) => {
        this.savedSearches = page.content;
        this.totalElements = page.totalElements;
      });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    const pageIndex = this.currentPage - 1;
    const pageSize = this.pageSize;
    this.getSavedSearches(pageIndex, pageSize);
  }

  getQueryParams(savedSearch: SavedSearch): Params {
    const queryParams: Params = {
      status: savedSearch.status,
      stateId: savedSearch.state.id?.toString(),
      minPrice: savedSearch.minPrice?.toString(),
      maxPrice: savedSearch.maxPrice?.toString(),
    };

    if (savedSearch.city) {
      queryParams['cityId'] = savedSearch.city.id?.toString();
    }
    if (savedSearch.bedrooms && savedSearch.bedrooms !== 0) {
      queryParams['bedrooms'] = savedSearch.bedrooms.toString();
    }
    if (savedSearch.bathrooms && savedSearch.bathrooms !== 0) {
      queryParams['bathrooms'] = savedSearch.bathrooms.toString();
    }

    return queryParams;
  }

  deleteSavedSearch(searchId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to delete this saved search?'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.propertyService.deleteSavedSearch(searchId)
          .subscribe(
            () => {
              const totalItemsOnCurrentPage = this.savedSearches.length;
              const lastPage = Math.ceil(this.totalElements / this.pageSize);
        
              if (totalItemsOnCurrentPage === 1 && this.currentPage > 1) {
                this.currentPage -= 1;
              }
     this.getSavedSearches(this.currentPage -1,this.pageSize);
              this.snackBar.open('Saved search deleted successfully', 'Close', {
                duration: 3000,
              });
            },
            (error) => {
              // Error - handle error message or notifications
            }
          );
      }
    });
  }

}