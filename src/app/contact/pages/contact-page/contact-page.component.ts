import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from '../../components/feature/contact-list/contact-list.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactListComponent],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent {}
