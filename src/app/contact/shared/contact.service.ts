import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactDataUrl = '../assets/list-contact.model.js';

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactDataUrl);
  }
}
