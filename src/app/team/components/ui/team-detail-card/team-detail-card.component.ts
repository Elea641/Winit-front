import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.type';
import { TeamService } from 'src/app/team/shared/team.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { MemberService } from 'src/app/team/shared/member.service';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';
import { ModalContent } from 'src/app/components/models/modal-content.class';
import { User } from 'src/app/auth/models/user.type';

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
export class TeamDetailCardComponent implements OnInit, OnDestroy {
  @Input() team$!: Observable<Team | null>;
  @Input() currentUser!: User;
  private teamSubscription!: Subscription;

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.teamSubscription = this.memberService.member$.subscribe(member => {
      if (member) {
        this.team$.subscribe(team => {
          if (team) {
            team.teamMembersCount++;
          }
        });
      } else {
        this.team$.subscribe(team => {
          if (team) {
            team.teamMembersCount--;
          }
        });
      }
    });
  }

  openDialog() {
    const modalData: ModalContent = {
      title: 'Confirmation',
      content: `Êtes-vous sûr de vouloir surrpimer cette équipe?`,
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      data: new ModalContent(modalData),
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.team$.subscribe(team => {
          if (team) {
            this.teamService.deleteTeam(team.name);
          }
        });
      }
    });
  }

  updateTeam(team: Team) {
    this.teamService.setTeam(team);
    this.router.navigate(['/form-team/update'], {
      queryParams: { teamName: team.name },
    });
  }
}
