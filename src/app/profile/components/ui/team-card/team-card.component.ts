import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent {
  @Input() team!: Team;
  currentUrl: string = '';
  tournamentId: string | null = '';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.currentUrl = this.router.url;

    this.route.paramMap.subscribe((params) => {
      this.tournamentId = params.get('id');
    });
  }

  onSelectTeam(team: Team): void {
    this.router.navigate([`teams-details/${team.name}`]);
  }
}
