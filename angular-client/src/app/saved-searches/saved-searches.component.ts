import { Component,OnInit  } from '@angular/core';
import{SavedSearch} from "../_models/SavedSearch";
import {PropertyService} from '../_services/property.service';
import {Page} from '../_models/page';

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

  constructor(private  propertyService: PropertyService) { }

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
}