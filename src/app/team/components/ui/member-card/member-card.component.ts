import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from 'src/app/team/models/member.type';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent {
  @Input() member!: Member;
}
