import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';

import {Property} from '../_models/property';

import {PropertyService} from '../_services/property.service';

// import { Event } from '@angular/core';



@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {
  property: Property = new Property();
  files: FileList | null = null;

  constructor(private propertyService: PropertyService) {}

  onSubmit(propertyForm: NgForm) {
    if (propertyForm.valid) {
      this.propertyService.createProperty(this.property, this.files).subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      propertyForm.resetForm();
    }
  }

  onFileChange(event: Event) {
    this.files = (event.target as HTMLInputElement).files;
  }
  
}
