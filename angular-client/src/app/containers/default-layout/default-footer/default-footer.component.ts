import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent implements OnInit {
  currentYear!: number;
  constructor() {
    super();
  }
  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }
  
}
