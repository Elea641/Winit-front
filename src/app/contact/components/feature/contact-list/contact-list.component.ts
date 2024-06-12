import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ContactService } from 'src/app/contact/shared/contact.service';
import { ContactCardComponent } from '../../ui/contact-card/contact-card.component';
import { ContactDev } from 'src/app/contact/models/contact-dev.type';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactCardComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent {
  contacts$: Observable<ContactDev[]> = this.contactService.getAllContactDevs();

  constructor(private contactService: ContactService) {}
}
