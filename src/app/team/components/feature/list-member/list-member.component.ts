import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from 'src/app/team/models/member.type';
import { MemberCardComponent } from '../../ui/member-card/member-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MemberService } from 'src/app/team/shared/member.service';
import { Observable, Subscription } from 'rxjs';
import { Team } from 'src/app/team/models/team.type';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';
import { MatIconModule } from '@angular/material/icon';
import { ModalContent } from 'src/app/components/models/modal-content.class';
import { ToastService } from 'src/app/shared/toast.service';
import { User } from 'src/app/auth/models/user.type';

@Component({
  selector: 'app-list-member',
  standalone: true,
  imports: [
    CommonModule,
    MemberCardComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss'],
})
export class ListMemberComponent implements OnInit, OnDestroy {
  @Input() team$!: Observable<Team | null>;
  @Input() currentUser!: User;
  teamSubscription!: Subscription;
  members: Member[] = [];
  teamName = '';
  memberDelete!: Member;

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.team$) {
      this.team$.subscribe(team => {
        if (team) {
          this.members = team?.members;
        }
      });
    }

    this.teamSubscription = this.memberService.member$.subscribe(member => {
      if (member) {
        this.members.push(member);
      } else {
        this.members = this.members.filter(
          member => member !== this.memberDelete
        );
      }
    });
  }

  openDialog(member: Member) {
    const modalData: ModalContent = {
      title: 'Confirmation',
      content: `Êtes-vous sûr de vouloir supprimer le membre.`,
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      data: new ModalContent(modalData),
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response === true) {
        this.team$.subscribe(team => {
          if (team) {
            this.memberService.deleteMemberByTeamName(team.name, member);
            this.memberDelete = member;
          } else {
            this.toastService.showError('Aucun utilisateur trouvé', 'Erreur');
          }
        });
      }
    });
  }
}
