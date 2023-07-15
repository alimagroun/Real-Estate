import { Component , OnInit , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ContactForm } from '../_models/ContactForm';
import { ContactFormService  } from '../_services/contact-form.service';
import { MatTableDataSource } from '@angular/material/table';
import {Page} from '../_models/page';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit{

  dataSource = new MatTableDataSource<ContactForm>;
  displayedColumns: string[] = ['id', 'name', 'email', 'subject','actions'];
  totalElements: number = 0;
  pageNumber:number=0;
  pageSize:number=10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private contactFormService: ContactFormService, private router: Router,private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getContactForms(this.pageNumber,this.pageSize);
  }

  getContactForms(pageNumber: number, pageSize: number): void {
    this.contactFormService.getAllContactForms(pageNumber, pageSize)
      .subscribe((page: Page<ContactForm>) => {
        this.dataSource.data =page.content;
        this.totalElements = page.totalElements;
      });
  }
  onPageChanged(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.getContactForms(pageIndex, pageSize);
  }
  viewMessageDetails(id: number) {
    this.router.navigate(['/messagedetails', id]);
  }
  deleteMessage(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to delete this message?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const previousTotalElements = this.totalElements;
        this.contactFormService.deleteContactForm(id).subscribe(
          () => {
            console.log('Message deleted successfully.');
  
            this.snackBar.open('Message deleted successfully.', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
  
            this.totalElements -= 1; // Reduce 1 from totalElements
  
            const currentPageIndex = Math.floor(previousTotalElements / this.pageSize);
            const isValidPageIndex = currentPageIndex < Math.ceil(this.totalElements / this.pageSize);
  
            if (!isValidPageIndex) {
              const previousPageIndex = Math.max(currentPageIndex - 1, 0);
              this.paginator.pageIndex = previousPageIndex; // Update the pagination component
            }
  
            // Fetch the data for the current or previous page
            this.getContactForms(this.paginator.pageIndex, this.paginator.pageSize);
          },
          (error) => {
            console.error('Error deleting message:', error);
          }
        );
      }
    });
  }
  
  
}

