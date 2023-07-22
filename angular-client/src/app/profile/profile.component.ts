import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { Component, OnInit} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {User} from '../_models/user';

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
  updatePasswordForm = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
  });
 
  constructor(private storageService: StorageService, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser(); 
    this.emailFormControl.setValue(this.currentUser.email);
    this.nameFormControl.setValue(this.currentUser.name);
    this.contactNumberFormControl.setValue(this.currentUser.contactNumber);
  }

  updateUser(): void {
    if (this.emailFormControl.valid && this.nameFormControl.valid && this.contactNumberFormControl.valid) {
      const updatedUser: User = {
        name: this.nameFormControl.value || '',
        email: this.emailFormControl.value || '',
        contactNumber: this.contactNumberFormControl.value || ''
      };
  
      this.authService.updateUser(this.currentUser.id, updatedUser).subscribe(
        (response: User) => {
          console.log('User updated successfully:', response);
          this.currentUser = response;
          this.storageService.saveUser(response);

          this.snackBar.open('Personal Details Updated.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center', 
            verticalPosition: 'bottom' 
          });
        },
        (error) => {
          if (error?.error === 'Email is already taken.') {
            this.emailFormControl.setErrors({ emailTaken: true });
          } 
        }
      );
    }
  }

  updatePassword() {
    const currentPassword = this.updatePasswordForm.get('currentPassword')?.value ?? '';
    const newPassword = this.updatePasswordForm.get('newPassword')?.value ?? '';
  
    this.authService.updatePassword1(this.currentUser.id, currentPassword, newPassword).subscribe(
      (response: any) => {
        this.snackBar.open('Password updated successfully', 'Close', {
          duration: 3000,
        });
        this.updatePasswordForm.reset();
      },
      (error) => {
        this.updatePasswordForm.get('currentPassword')?.setErrors({ invalidPassword: true });
    
      }
    );
  }
  
}