import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements  OnInit  {
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  step1Complete = false;
  step2Complete = false;
  errorMessage!: string;
  errorMessage0!: string;
  email: string = '';
  password! : string;
  resetCode!: string;
  edit =true;

  @ViewChild(MatStepper) stepper!: MatStepper;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

ngOnInit(): void {
}
  initiatePasswordReset() {

    console.log('initiatePasswordReset() called');
    console.log('Email value:', this.email);
  
    this.authService.initiatePasswordReset(this.email).subscribe(
      (response) => {
        if (response) {        
        this.step1Complete = true;
        setTimeout(() => {
          this.stepper.next();
        }, 10);
        } else {
          this.errorMessage0= "Invalid email";
        }
      },
      (error: any) => {
      }
    );
  }
checkResetCode() {
  this.authService.checkResetCode(this.email, this.resetCode).subscribe(
    () => {
      console.log("Reset code is correct");
      this.step2Complete = true;
      setTimeout(() => {
        this.stepper.next();
  //      this.step1Complete = false;
      }, 10);
this.edit =false;
    },
    (error) => {
      if (error.error instanceof ErrorEvent) {
        // Client-side error occurred
        this.errorMessage = "An error occurred: " + error.error.message;
      } else {
        // Backend returned an unsuccessful response code
        this.errorMessage = error.error.message;
      }
      console.log("Error message:", this.errorMessage);
    }
  );
}
updatePassword(): void {
  this.authService.updatePassword(this.email, this.password, this.resetCode)
    .subscribe(
      response => {
        // Password updated successfully
        this.snackBar.open('Password updated successfully', 'Close', {
          duration: 3000
        });
        // Auto navigate to the login page
        this.router.navigate(['/login']);
      },
      error => {
        // Handle error case
        this.snackBar.open('Failed to update password. Please try again.', 'Close', {
          duration: 3000
        });
      }
    );
}
stepperReset(){
  this.step1Complete = false;
  this.step2Complete = false;
  this.errorMessage0 = "";
  this.errorMessage =""; 
}
    
   
  }
  
  
  
  



