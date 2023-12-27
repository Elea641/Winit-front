import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactDetails } from '../models/contact.details.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactDataUrl = '../assets/list-contact.model.json';
  private contactDetailsDataUrl = '../assets/list-contact-details.model.json';

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactDataUrl);
  }

  getAllContactDetails(): Observable<ContactDetails[]> {
    return this.http.get<ContactDetails[]>(this.contactDetailsDataUrl);
  }
}
