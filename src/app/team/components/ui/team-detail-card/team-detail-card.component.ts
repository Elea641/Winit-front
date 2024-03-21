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
  private teamMembersCountAddSubscription!: Subscription;
  private teamMembersCountDeletedSubscription!: Subscription;
  public teamMembersCount!: number;

  constructor(
    private teamService: TeamService,
    public dialog: MatDialog,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.teamMembersCountAddSubscription =
      this.memberService.teamMembersCountAdd$.subscribe(
        (teamMembersAddCount) => {
          if (teamMembersAddCount) {
            this.updateTeamMembersCount(teamMembersAddCount);
          }
        }
      );

    this.teamMembersCountDeletedSubscription =
      this.memberService.teamMembersCountDeleted$.subscribe(
        (teamMembersDeletedCount) => {
          if (teamMembersDeletedCount) {
            this.updateTeamMembersCount(-teamMembersDeletedCount);
          }
        }
      );

    this.team$.subscribe((team) => {
      if (team) {
        this.teamMembersCount = team.numberOfMemberInTeam;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.teamMembersCountAddSubscription) {
      this.teamMembersCountAddSubscription.unsubscribe();
    }
    if (this.teamMembersCountDeletedSubscription) {
      this.teamMembersCountDeletedSubscription.unsubscribe();
    }
  }

  updateTeamMembersCount(change: number): void {
    this.team$.subscribe((team) => {
      if (team) {
        this.teamMembersCount += change;
      }
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
