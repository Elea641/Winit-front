import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  teamName: string = '';

  constructor(
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formattedLabels = this.buttonLabels.map((label) =>
      label.toUpperCase().replace(/-/g, ' ')
    );
    this.route.paramMap.subscribe((params) => {
      this.teamName = params.get('teamName') || '';
    });
  }

  onButtonClick(label: string) {
    if (label === 'CREATE MEMBER' || label === 'LIST MEMBER') {
      const formattedLabelConvert = label.toLowerCase().replace(/ /g, '-');
      this.router.navigate([
        '/teams-details',
        this.teamName,
        formattedLabelConvert,
      ]);
    } else {
      const formattedLabelConvert = label.toLowerCase().replace(/ /g, '-');
      this.buttonClick.emit(formattedLabelConvert);
      this.isDefaultStyleFocus = false;
      this.teamService.unselectTeam();
    }
  }
}
