import { Component,OnInit , ViewChild, AfterViewInit} from '@angular/core';
import {PropertyService} from '../_services/property.service';

import {Property} from '../_models/property';
import {Page} from '../_models/page';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})

export class PropertyListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'status',
    'bedrooms',
    'bathrooms',
    'size',
    'price',
    'cityId'
  ];
  dataSource = new MatTableDataSource<Property>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadPage(0, 10);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPage(pageIndex: number, pageSize: number): void {
    this.propertyService.getAll(pageIndex, pageSize).subscribe((page: Page<Property>) => {
      this.dataSource.data = page.content;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.length = page.totalElements;
        console.log(`Total elements: ${page.totalElements}`);
      }
    });
  }

  onPageChanged(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.loadPage(pageIndex, pageSize);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}