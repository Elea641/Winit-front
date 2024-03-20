import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {Sport} from "../../../../sport/models/sport.model";
import {SportService} from "../../../../sport/shared/sport.service";

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
    MatPaginatorModule
  ],
  templateUrl: './back-office-sports-table.component.html',
  styleUrls: ['./back-office-sports-table.component.scss']
})
export class BackOfficeSportsTableComponent implements OnInit {
  dataSource!: MatTableDataSource<Sport>;
  displayedColumns = ["position", "name", "imageUrl", "numberOfPlayers", "actions"];
  positionColumnData: number = 0;

  constructor(
    private sportService: SportService
  ) {
  }

  ngOnInit() {
    this.fetchSports();
  }

  fetchSports() {
    this.sportService.getAllSports().subscribe(
      (sports: Sport[]) => {
        sports.forEach((sport, index) => {
          sport.position = ++this.positionColumnData;
        });
        this.dataSource = new MatTableDataSource<Sport>(sports);
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
}
