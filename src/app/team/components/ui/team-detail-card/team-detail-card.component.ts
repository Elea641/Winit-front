import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { TeamService } from 'src/app/team/shared/team.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/components/ui/delete-modal/delete-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { MemberService } from 'src/app/team/shared/member.service';

@Component({
  selector: 'app-team-detail-card',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './team-detail-card.component.html',
  styleUrls: ['./team-detail-card.component.scss'],
})
export class TeamDetailCardComponent {
  @Input() team$!: Observable<Team | null>;
  public membersCount!: number;
  public teamMembersCountSubscription!: Subscription;

  constructor(
    private teamService: TeamService,
    public dialog: MatDialog,
    private memberService: MemberService
  ) {}

  ngOnDestroy(): void {
    if (this.teamMembersCountSubscription) {
      this.teamMembersCountSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.teamMembersCountSubscription =
      this.memberService.teamMembersCount$.subscribe(() => {
        this.team$.subscribe((team) => {
          if (team) {
            this.teamService
              .getTeamByTeamName(team.name)
              .subscribe((newteam) => {
                if (newteam) {
                  this.membersCount = newteam.numberOfMemberInTeam;
                }
              });
          }
        });
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.team$.subscribe((team) => {
          if (team) {
            this.teamService.deleteTeamByName(team.name);
          }
        });
      }
    });
  }
}
