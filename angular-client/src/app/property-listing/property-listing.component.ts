import { Component , OnInit} from '@angular/core';
import{PropertyProjection} from "../_models/PropertyProjection";
import {PropertyService} from '../_services/property.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.scss']
})
export class PropertyListingComponent  implements OnInit {
  propertiesPage: PropertyProjection[] = [];
  totalElements: number = 0;
  currentPage = 1;
  pageSize = 12;
  maxSize = 5;
  pageIndex = 0;

  constructor(private propertyService: PropertyService,private router: Router,private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getProperties(this.pageIndex,this.pageSize);
  }


  getProperties(pageIndex: number, pageSize: number) {

    this.propertyService.getPropertiesByUserId(pageIndex, pageSize).subscribe(
      (data) => {
        this.propertiesPage = data.content;
        this.totalElements = data.totalElements;
        console.log('Retrieved properties:', this.propertiesPage);
        // Do something with the retrieved properties
      },
      (error) => {
        console.error('Error retrieving properties:', error);
      }
    );
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    const pageIndex = this.currentPage - 1;
    const pageSize = this.pageSize;
    this.getProperties(pageIndex, pageSize);
  }
  viewPropertyDetails(propertyId: number): void {
    this.router.navigate(['/property', propertyId]);
  }
  updateProperty(propertyId: number): void {
    this.router.navigate(['/updateproperty', propertyId]);
  }

  deleteProperty(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to delete this property?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.propertyService.deleteProperty(id).subscribe(
          () => {
            console.log('Property deleted successfully.');
  
            this.snackBar.open('Property deleted successfully.', 'Close', {
              duration: 3000, 
              panelClass: ['success-snackbar']
            });
            this.getProperties(this.currentPage -1,this.pageSize);
            
          },
          (error) => {
            console.error('Error deleting property:', error);
          }
        );
      }
    });
  }
}
