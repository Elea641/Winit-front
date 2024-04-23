import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { TeamService } from 'src/app/team/shared/team.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/components/ui/delete-modal/delete-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription, of } from 'rxjs';
import { MemberService } from 'src/app/team/shared/member.service';
import { Router } from '@angular/router';

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
  private teamSubscription!: Subscription;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.teamSubscription = this.memberService.member$.subscribe((member) => {
      if (member) {
        this.team$.subscribe((team) => {
          if (team) {
            team.teamMembersCount++;
          }
        });
      } else {
        this.team$.subscribe((team) => {
          if (team) {
            team.teamMembersCount--;
          }
        });
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.team$.subscribe((team) => {
          if (team) {
            this.teamService.deleteTeam(team.name);
          }
        });
      }
    });
  }

  updateTeam(team: Team) {
    this.teamService.setTeam(team);
    this.router.navigate(['/form-team/:update']);
  }
}
