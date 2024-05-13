import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ListMemberComponent } from '../list-member/list-member.component';
import { CreateMemberComponent } from '../create-member/create-member.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-member',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ListMemberComponent,
    CreateMemberComponent,
  ],
  templateUrl: './menu-member.component.html',
  styleUrls: ['./menu-member.component.scss'],
})
export class MenuMemberComponent {
  @Input() team$!: Observable<Team | null>;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  private teamSubscription!: Subscription;

  ngOnDestroy(): void {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

  handleCancelClick() {
    this.tabGroup.selectedIndex = 0;
  }
}
