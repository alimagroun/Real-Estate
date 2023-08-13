import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { cilPhone, cilShieldAlt } from '@coreui/icons';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    name: null,
    contactNumber: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  icons = { cilPhone, cilShieldAlt };

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { name,contactNumber,username, email, password } = this.form;

    this.authService.register(username, email, password,name,contactNumber ).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}