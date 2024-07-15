import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamCardComponent } from 'src/app/profile/components/ui/team-card/team-card.component';
import { Team } from 'src/app/team/models/team.type';
@Component({
  selector: 'app-list-team-by-sport',
  standalone: true,
  imports: [CommonModule, TeamCardComponent],
  templateUrl: './list-team-by-sport.component.html',
  styleUrls: ['./list-team-by-sport.component.scss'],
})
export class ListTeamBySportComponent implements OnInit {
  @Input() teams!: Team[] | null;

  validTeams!: Team[] | undefined;

  ngOnInit() {
    this.validTeams = this.teams?.filter(
      team => team.teamMembersCount === team.totalPlayers
    );
  }
}
