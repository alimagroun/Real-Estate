import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactForm } from '../_models/ContactForm';
import { ContactFormService  } from '../_services/contact-form.service';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  recaptchaToken: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private contactFormService: ContactFormService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initContactForm();
  }

  initContactForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(25), Validators.maxLength(500)]],
      recaptchaToken: ['', Validators.required] // Add the recaptchaToken form control
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    const contactFormData: ContactForm = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message,
      recaptchaToken: this.recaptchaToken
    };

    this.contactFormService.createContactForm(contactFormData).subscribe(
      (response) => {
        this.contactForm.reset();
        this.clearFormErrors();
        this.snackBar.open('Thank you for contacting us! Your message has been successfully sent.', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.log('Form submission failed');
      }
    );
  }
  clearFormErrors() {
    Object.keys(this.contactForm.controls).forEach((key) => {
      this.contactForm.get(key)?.setErrors(null);
    });
  }
 public handleCaptchaResponse(token: string): void {
    this.recaptchaToken = token;
  }
    public environment = environment;
}