import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BackOfficeSportService } from '../../../shared/back-office-sport.service';
import { AdminSport } from '../../../models/admin-sport.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { GetImageService } from '../../../../shared/get-image.service';
import { MatCardModule } from '@angular/material/card';
import { BackOfficeSportDeleteComponent } from '../back-office-sport-delete/back-office-sport-delete.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-back-office-sport-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    RouterLink,
    MatDialogModule,
  ],
  templateUrl: './back-office-sport-detail.component.html',
  styleUrls: ['./back-office-sport-detail.component.scss'],
})
export class BackOfficeSportDetailComponent implements OnInit {
  sport: AdminSport | undefined;
  public image: any;

  constructor(
    private route: ActivatedRoute,
    private sportService: BackOfficeSportService,
    private imageService: GetImageService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    if (this.route.params) {
      this.route.params.subscribe(params => {
        const id = params['id([0-9]+)'];
        this.getSportDetails(id);
      });
    }
  }

  private getSportDetails(id: number) {
    this.sportService.getSportById(id).subscribe((sport: AdminSport) => {
      this.sport = sport;
      this.displayImage(sport.imageUrl);
    });
  }

  private displayImage(imageUrl: any) {
    this.imageService.getImage(imageUrl).subscribe(data => {
      this.image = data;
    });
  }

  openDeleteDialog(sportId: any) {
    this.dialog.open(BackOfficeSportDeleteComponent, {
      data: {
        sportId: sportId,
      },
    });
  }
}
