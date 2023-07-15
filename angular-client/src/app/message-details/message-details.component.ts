import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactForm } from '../_models/ContactForm';
import { ContactFormService  } from '../_services/contact-form.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {
  contactForm$!: Observable<ContactForm>;
  
  constructor(
    private route: ActivatedRoute,
    private contactFormService: ContactFormService
  ) { }
  
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.contactForm$ = this.contactFormService.getContactFormById(id);
  }
}
