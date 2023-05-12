import { Component,OnInit , ViewChild, AfterViewInit} from '@angular/core';
import {PropertyService} from '../_services/property.service';

import {Property} from '../_models/property';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})

export class PropertyListComponent implements OnInit {
  pageSizeOptions: number[] = [5, 10, 25, 100];
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

  ngOnInit() {

    this.propertyService.getAll().subscribe((data) => {
      this.dataSource.data = data;
   //   this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

