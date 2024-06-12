import { Observable } from 'rxjs';
import { ContactDev } from '../../models/contact-dev.type';
import { ContactWinit } from '../../models/contact-winit.type';

export interface IContactService {
  getAllContactDevs(): Observable<ContactDev[]>;

  getAllContactWinit(): Observable<ContactWinit[]>;
}
