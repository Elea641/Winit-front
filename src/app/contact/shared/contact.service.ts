import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactWinit } from '../models/contact-winit.type';
import { IContactService } from './interfaces/IContact.service';
import { ContactDev } from '../models/contact-dev.type';

@Injectable({
  providedIn: 'root',
})
export class ContactService implements IContactService {
  private contactDevsDataUrl = '../assets/list-contact-devs.model.json';
  private contactWinitDataUrl = '../assets/list-contact-winit.model.json';

  constructor(private http: HttpClient) {}

  getAllContactDevs(): Observable<ContactDev[]> {
    return this.http.get<ContactDev[]>(this.contactDevsDataUrl);
  }

  getAllContactWinit(): Observable<ContactWinit[]> {
    return this.http.get<ContactWinit[]>(this.contactWinitDataUrl);
  }
}
