import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  isLinear = true;
  emailFormGroup!: FormGroup;
  addressFormGroup!: FormGroup;
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.emailFormGroup = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]]
    });

    this.addressFormGroup = this.formBuilder.group({
      addressCtrl: ['', Validators.required]
    });
  }

 

  sendResetCode(): void {
  //  const email = this.emailFormGroup.get('emailCtrl').value;
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}
