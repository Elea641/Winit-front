import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {Router, RouterLink} from "@angular/router";
import {BackOfficeSportService} from "../../../shared/back-office-sport.service";
import {AdminSport} from "../../../models/admin-sport.model";
import {BackOfficeSportDeleteComponent} from "../back-office-sport-delete/back-office-sport-delete.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-back-office-sports-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    RouterLink,
    MatDialogModule
  ],
  templateUrl: './back-office-sports-table.component.html',
  styleUrls: ['./back-office-sports-table.component.scss']
})
export class BackOfficeSportsTableComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<AdminSport>;
  displayedColumns = ["position", "name", "imageUrl", "numberOfPlayers", "numberOfTournaments", "numberOfTeams", "actions"];
  positionColumnData: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.fetchSports();
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private backOfficeSportService: BackOfficeSportService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  fetchSports() {
    this.backOfficeSportService.getAllSports().subscribe(
      (sports: AdminSport[]) => {
        sports.forEach((sport, index) => {
          sport.position = ++this.positionColumnData;
        });
        this.dataSource = new MatTableDataSource<AdminSport>(sports);
      },
      (error) => {
        console.error("Error fetching sports:", error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewSportDetails(sportId: number) {
    this.router.navigate(['/back-office/sport', sportId]);
  }

  viewEditPage(sportId: number) {
    this.router.navigate(['/back-office/sport/edit', sportId]);
  }

  openDeleteDialog(sportId: any) {
    this.dialog.open(BackOfficeSportDeleteComponent, {
      data: {
        sportId: sportId,
      },
    });
  }
}
