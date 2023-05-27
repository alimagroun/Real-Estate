import { Component,OnInit , ViewChild, AfterViewInit} from '@angular/core';
import {PropertyService} from '../_services/property.service';

import {Property} from '../_models/property';
import {Page} from '../_models/page';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})

export class PropertyListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'status',
    'bedrooms',
    'bathrooms',
    'size',
    'price',
    'cityId',
    'actions'
  ];
  dataSource = new MatTableDataSource<Property>();
  @ViewChild(MatSort) sort!: MatSort;

  totalElements: number = 0;
  filterText: string = '';

  constructor(private propertyService: PropertyService, private router: Router) {}

  ngOnInit(): void {
    this.loadPage(0, 10);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  loadPage(pageIndex: number, pageSize: number): void {
    this.propertyService.getAll(pageIndex, pageSize, this.filterText).subscribe((page: Page<Property>) => {
      this.dataSource.data = page.content;
        this.totalElements = page.totalElements;
        console.log(`Total elements: ${page.totalElements}`);
      
    });
  }
  onPageChanged(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.loadPage(pageIndex, pageSize);
  }
  applyFilter(): void {
    this.loadPage(0, 10);
  }
  viewPropertyDetails(propertyId: number): void {
    this.router.navigate(['/property', propertyId]);
  }
  updateProperty(propertyId: number): void {
    this.router.navigate(['/updateproperty', propertyId]);
  }
}