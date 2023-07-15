package com.magroun.realestate.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.magroun.realestate.model.ContactForm;
import com.magroun.realestate.services.ContactFormService;
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/contact-forms")
public class ContactFormController {

	@Autowired
    private ContactFormService contactFormService;



    @GetMapping("/all")
    public ResponseEntity<Page<ContactForm>> getAllContactForms(Pageable pageable) {
        Page<ContactForm> contactForms = contactFormService.getAllContactForms(pageable);
        return ResponseEntity.ok(contactForms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactForm> getContactFormById(@PathVariable Long id) {
        ContactForm contactForm = contactFormService.getContactFormById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Contact Form ID: " + id));
        return ResponseEntity.ok(contactForm);
    }

    @PostMapping
    public ResponseEntity<ContactForm> createContactForm(@RequestBody ContactForm contactForm) {
        ContactForm createdForm = contactFormService.createContactForm(contactForm);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdForm);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactForm> updateContactForm(@PathVariable Long id, @RequestBody ContactForm updatedForm) {
        ContactForm existingForm = contactFormService.getContactFormById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Contact Form ID: " + id));

        existingForm.setName(updatedForm.getName());
        existingForm.setEmail(updatedForm.getEmail());
        existingForm.setMessage(updatedForm.getMessage());
        existingForm.setSubject(updatedForm.getSubject());

        ContactForm updatedContactForm = contactFormService.updateContactForm(existingForm);
        return ResponseEntity.ok(updatedContactForm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContactForm(@PathVariable Long id) {
        contactFormService.deleteContactForm(id);
        return ResponseEntity.noContent().build();
    }
}
