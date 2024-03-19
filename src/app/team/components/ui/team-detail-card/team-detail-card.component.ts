import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { TeamService } from 'src/app/team/shared/team.service';
import { MatDividerModule } from '@angular/material/divider';
import { MemberDetailComponent } from '../../feature/member-detail/member-detail.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/components/ui/delete-modal/delete-modal.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-team-detail-card',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MemberDetailComponent,
    RouterOutlet,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './team-detail-card.component.html',
  styleUrls: ['./team-detail-card.component.scss'],
})
export class TeamDetailCardComponent {
  selectedTeam: Team | null = null;
  teamName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.teamName = params['teamName'];

      this.teamService.getTeamByTeamName(this.teamName).subscribe((team) => {
        this.selectedTeam = team;
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.teamService.deleteTeamByName(this.teamName);
      }
    });
  }
}
