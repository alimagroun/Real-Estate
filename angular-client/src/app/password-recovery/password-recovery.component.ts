import { Component, OnInit ,ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements  OnInit  {
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  emailFound: boolean = false;
  email: string = '';
  step1Complete = false;
  step2Complete = false;
  errorMessage!: string;

  @ViewChild(MatStepper) stepper!: MatStepper;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

ngOnInit(): void {
  this.email = '';
 /* this.firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  this.secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  }); */
}

 

  goBack(): void {
    this.router.navigate(['/login']);
  }
  initiatePasswordReset(email : string) {

    console.log('initiatePasswordReset() called');
    console.log('Email value:', email);
  
    this.authService.initiatePasswordReset(email).subscribe(
      (response) => {
        console.log('Response:', response); // Log the full response object for inspection
    
        // Check the response string to determine success or error
        if (response) {
          
        this.step1Complete = true;
        setTimeout(() => {
          this.stepper.next();
    //      this.step1Complete = false;
        }, 100);
          this.emailFound = true;
          console.log('Email sent successfully');
        } else {
      
          this.emailFound = false;
    
          console.log('Error occurred:', response);
          console.log('this Email value:', this.email, this.emailFound);
        }
      },
      (error: any) => {
        // Handle the error response
        this.emailFound = false;
        console.error('Error occurred:', error);
      }
    );
  }

  password! : string;
  resetCode!: string;


checkResetCode() {
  this.authService.checkResetCode(this.email, this.resetCode).subscribe(
    () => {
      console.log("Reset code is correct");
      this.step2Complete = true;
      setTimeout(() => {
        this.stepper.next();
  //      this.step1Complete = false;
      }, 100);

    },
    (error) => {
      if (error.error instanceof ErrorEvent) {
        // Client-side error occurred
        this.errorMessage = "An error occurred: " + error.error.message;
      } else {
        // Backend returned an unsuccessful response code
        this.errorMessage = "Error: " + error.error.message;
      }
      console.log("Error message:", this.errorMessage);
    }
  );
}

  
    
   
  }
  
  
  
  



