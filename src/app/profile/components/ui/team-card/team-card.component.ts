import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.type';
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
export class TeamCardComponent implements OnInit {
  @Input() team!: Team;
  currentUrl = '';
  tournamentId: string | null = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.tournamentId = this.route.snapshot.paramMap.get('id');
  }

  onSelectTeam(team: Team): void {
    this.router.navigate([`teams-details/${team.name}`]);
  }
}
