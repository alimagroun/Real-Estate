import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  emailFormControl = new FormControl('', [
    Validators.required,
     Validators.email
    ]);
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50)
  ]);

  contactNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20)
  ]);
 
  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser(); 
    this.emailFormControl.setValue(this.currentUser.email);
    this.nameFormControl.setValue(this.currentUser.name);
    this.contactNumberFormControl.setValue(this.currentUser.contactNumber);
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log("Logout successful.");
        this.storageService.clean(); // Assuming this clears any stored user data
  
        window.location.reload(); // Refresh the page after logout
      },
      error: (err) => {
        console.log("Logout error:", err);
      }
    });
  }
  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('maxlength')) {
      return 'Exceeded maximum length';
    }

    return '';
  }

}