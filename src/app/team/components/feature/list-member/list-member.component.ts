import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from 'src/app/team/models/member.model';
import { MemberCardComponent } from '../../ui/member-card/member-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/components/ui/delete-modal/delete-modal.component';
import { MemberService } from 'src/app/team/shared/member.service';
import { Observable, Subscription } from 'rxjs';
import { Team } from 'src/app/team/models/team.model';

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
  private teamSubscription!: Subscription;
  members: Member[] = [];

  constructor(private memberService: MemberService, public dialog: MatDialog) {}

  ngOnDestroy(): void {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.team$.subscribe((team) => {
      if (team) {
        this.members = team?.members;
      }
    });

    this.teamSubscription = this.memberService.team$.subscribe((team) => {
      if (team) {
        this.members = team.members;
      }
    });
  }

  openDialog(member: Member) {
    const dialogRef = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.team$.subscribe((team) => {
          if (team) {
            this.memberService.deleteMemberByName(team.name, member);
          } else {
            console.error('Utilisateur introuvable');
          }
        });
      }
    });
  }
}
