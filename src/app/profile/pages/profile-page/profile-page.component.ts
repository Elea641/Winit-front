import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentProfileDetailsComponent } from '../../components/feature/current-profile-details/current-profile-details.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, of } from 'rxjs';
import { UserStatistics } from '../../models/user-statistics.model';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, CurrentProfileDetailsComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  userStatistics$!: Observable<UserStatistics>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.route.data) {
      this.userStatistics$ = this.route.data.pipe(
        concatMap(data => {
          if (data && data['statistics']) {
            return of(data['statistics']);
          } else {
            return of(null);
          }
        })
      );
    }
  }
}
