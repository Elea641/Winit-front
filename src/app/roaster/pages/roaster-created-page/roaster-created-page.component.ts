import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoasterComponent } from '../../components/feature/create-roaster/create-roaster.component';

@Component({
  selector: 'app-roaster-created-page',
  standalone: true,
  imports: [CommonModule, CreateRoasterComponent],
  templateUrl: './roaster-created-page.component.html',
  styleUrls: ['./roaster-created-page.component.scss'],
})
export class RoasterCreatedPageComponent {}
