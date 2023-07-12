import { Component,OnInit  } from '@angular/core';
import{SavedSearch} from "../_models/SavedSearch";
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
  totalItems!: number;

  constructor(private  propertyService: PropertyService,private router: Router,private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSavedSearches();
  }
  getSavedSearches() {
    this.propertyService.getSavedSearches(this.currentPage, this.pageSize)
      .subscribe((page: Page<SavedSearch>) => {
        this.savedSearches = page.content;
        this.totalItems = page.totalElements;
      });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getSavedSearches();
  }
  applyFilter(savedSearch: SavedSearch, event: Event): void {
    event.preventDefault();
    const queryParams: Params = {
      status: savedSearch.status,
      stateId: savedSearch.state.id?.toString(),
      minPrice: savedSearch.minPrice?.toString() ,
      maxPrice: savedSearch.maxPrice?.toString() ,
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

    this.router.navigate(['/propertysearch'], { queryParams });
  }

  deleteSavedSearch(searchId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.propertyService.deleteSavedSearch(searchId)
          .subscribe(
            () => {
     this.getSavedSearches();
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