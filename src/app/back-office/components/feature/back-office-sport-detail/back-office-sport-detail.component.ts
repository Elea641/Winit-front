import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {BackOfficeSportService} from "../../../shared/back-office-sport.service";
import {AdminSport} from "../../../models/admin-sport.model";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'app-back-office-sport-detail',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './back-office-sport-detail.component.html',
  styleUrls: ['./back-office-sport-detail.component.scss']
})
export class BackOfficeSportDetailComponent implements OnInit {

  sport: AdminSport | undefined;

  constructor(
    private route: ActivatedRoute,
    private sportService: BackOfficeSportService
  ) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id([0-9]+)'];
      this.getSportDetails(id);
    })
  }

  private getSportDetails(id: number) {
    this.sportService.getSportById(id).subscribe(
      (sport: AdminSport) => {
        this.sport = sport;
      },
      (error) => {
        console.error("Error fetching sport " + id + ": ", error);
      }
    )
  }
}
