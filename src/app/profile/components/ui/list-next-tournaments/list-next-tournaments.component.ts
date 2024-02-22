import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-list-next-tournaments',
  standalone: true,
    imports: [CommonModule, MatButtonModule],
  templateUrl: './list-next-tournaments.component.html',
  styleUrls: ['./list-next-tournaments.component.scss']
})
export class ListNextTournamentsComponent {
  @Input() currentProfile!: any;
}
