package com.magroun.realestate.services;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.magroun.realestate.model.ContactForm;
import com.magroun.realestate.repository.ContactFormRepository;

@Service
public class ContactFormService {
	 @Autowired
    private ContactFormRepository contactFormRepository;



    public Page<ContactForm> getAllContactForms(Pageable pageable) {
        return contactFormRepository.findAll(pageable);
    }

    public Optional<ContactForm> getContactFormById(Long id) {
        return contactFormRepository.findById(id);
    }

    public ContactForm createContactForm(ContactForm contactForm) {
        return contactFormRepository.save(contactForm);
    }

    public ContactForm updateContactForm(ContactForm contactForm) {
        return contactFormRepository.save(contactForm);
    }

    public void deleteContactForm(Long id) {
        contactFormRepository.deleteById(id);
    }
}