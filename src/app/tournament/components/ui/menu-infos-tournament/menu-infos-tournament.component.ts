import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu-infos-tournament',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './menu-infos-tournament.component.html',
  styleUrls: ['./menu-infos-tournament.component.scss'],
})
export class MenuInfosTournamentComponent {
  @Output() buttonClick = new EventEmitter<string>();
  isDefaultStyleFocus = true;

  onButtonClick(value: string) {
    this.buttonClick.emit(value);
    this.isDefaultStyleFocus = false;
  }
}
