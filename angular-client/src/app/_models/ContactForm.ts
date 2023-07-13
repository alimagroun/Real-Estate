export class ContactForm {
    id?: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    recaptchaToken?: string;
  
    constructor(name: string, email: string, subject: string, message: string, recaptchaToken?: string,id?: number) {
      this.name = name;
      this.email = email;
      this.subject = subject;
      this.message = message;
      this.recaptchaToken = recaptchaToken;
      if (id) {
        this.id = id;
      }
    }
  }
  