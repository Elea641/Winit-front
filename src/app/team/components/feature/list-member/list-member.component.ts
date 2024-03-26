import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from 'src/app/team/models/member.model';
import { MemberCardComponent } from '../../ui/member-card/member-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/components/ui/delete-modal/delete-modal.component';
import { MemberService } from 'src/app/team/shared/member.service';
import { Observable, Subscription } from 'rxjs';
import { TeamMember } from 'src/app/team/models/team-member.model';
import { Team } from 'src/app/team/models/team.model';
import { UserService } from 'src/app/auth/shared/user.service';
import { CurrentUser } from 'src/app/auth/models/current-user.model';

@Component({
  selector: 'app-list-member',
  standalone: true,
  imports: [
    CommonModule,
    MemberCardComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss'],
})
export class ListMemberComponent {
  @Input() team$!: Observable<Team | null>;
  @Input() teamMembers$!: Observable<TeamMember | null>;
  members: Member[] = [];
  leadTeamName: string = '';
  private memberSubscription!: Subscription;
  users$!: Observable<CurrentUser[]>;

  constructor(
    private memberService: MemberService,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    if (this.memberSubscription) {
      this.memberSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.memberSubscription = this.memberService.member$.subscribe((member) => {
      if (member) {
        this.members.push(member);
      }
    });

    this.teamMembers$.subscribe((teamMember) => {
      if (teamMember) {
        this.leadTeamName = teamMember?.leadTeamName;
        this.members = teamMember?.members;
      }
    });

    this.users$ = this.userService.getAllUsers();
  }

  openDialog(memberName: string) {
    const dialogRef = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.team$.subscribe((team) => {
          if (team) {
            this.users$.subscribe((users) => {
              const user = users.find((u) => u.firstName === memberName);
              if (user) {
                const memberEmail = user.email;
                if (memberEmail) {
                  this.memberService
                    .deleteMemberByName(team.name, memberEmail)
                    .subscribe((members) => {
                      this.members = members.members;
                    });
                }
              } else {
                console.error('Utilisateur introuvable');
              }
            });
          }
        });
      }
    });
  }
}
