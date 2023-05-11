import { Component,OnInit , ViewChild, AfterViewInit} from '@angular/core';
import {PropertyService} from '../_services/property.service';

import {Property} from '../_models/property';

import { DataTablesModule } from 'angular-datatables';

declare var DataTables: any;



@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})

export class PropertyListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  properties: Property[] = [];
  dtColumns: string[] = [
    'name',
    'description',
    'status',
    'bedrooms',
    'bathrooms',
    'size',
    'price',
    'cityId'
  ];

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.propertyService.getAll().subscribe((data) => {
      this.properties = data;
      console.log(this.properties.length);
    });
  }
}



