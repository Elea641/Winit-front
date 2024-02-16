import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeamService } from 'src/app/team/shared/team.service';

@Component({
  selector: 'app-menu-buttons',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './menu-buttons.component.html',
  styleUrls: ['./menu-buttons.component.scss'],
})
export class MenuButtonsComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<string>();
  @Input() buttonLabels: string[] = [];
  formattedLabels: string[] = [];
  isDefaultStyleFocus = true;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.formattedLabels = this.buttonLabels.map((label) =>
      label.toUpperCase().replace(/-/g, ' ')
    );
  }

  onButtonClick(label: string) {
    const formattedLabelConvert = label.toLowerCase().replace(/ /g, '-');
    this.buttonClick.emit(formattedLabelConvert);
    this.isDefaultStyleFocus = false;
    this.teamService.unselectTeam();
  }
}
