import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactDetails } from '../../models/contact.details.model';

export interface IContactService {
  getAllContacts(): Observable<Contact[]>;

  getAllContactDetails(): Observable<ContactDetails[]>;
}
