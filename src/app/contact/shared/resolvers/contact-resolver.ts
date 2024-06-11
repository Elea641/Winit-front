import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ContactService } from '../contact.service';
import { ContactWinit } from '../../models/contact-winit.type';

export const contactResolver: ResolveFn<ContactWinit[]> = (): Observable<
  ContactWinit[]
> => {
  return inject(ContactService).getAllContactWinit();
};
