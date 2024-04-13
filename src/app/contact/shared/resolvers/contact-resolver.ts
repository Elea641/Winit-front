import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ContactDetails } from '../../models/contact.details.model';
import { ContactService } from '../contact.service';

export const contactResolver: ResolveFn<ContactDetails[]> = (): Observable<
  ContactDetails[]
> => {
  return inject(ContactService).getAllContactDetails();
};
