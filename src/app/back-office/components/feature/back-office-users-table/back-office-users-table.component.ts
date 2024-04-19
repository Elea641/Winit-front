import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {AdminUser} from "../../../models/admin-user.model";
import {BackOfficeUserService} from "../../../shared/back-office-user.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-back-office-users-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, RouterLink, MatTableModule, MatPaginatorModule, MatSlideToggleModule],
  templateUrl: './back-office-users-table.component.html',
  styleUrls: ['./back-office-users-table.component.scss']
})
export class BackOfficeUsersTableComponent implements AfterViewInit{

  dataSource!: MatTableDataSource<AdminUser>;
  displayedColumns = ["position", "lastName", "firstName", "dateOfBirth", "email", "city", "role", "createdAt", "updatedAt", "isEnabled", "actions"];
  positionColumnData: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.fetchUsers();
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private backOfficeUserService: BackOfficeUserService
  ) {
  }

  fetchUsers() {
    this.backOfficeUserService.getAllUsers().subscribe(
      (adminUsers: AdminUser[]) => {
        adminUsers.forEach((user, index) => {
        user.position = ++this.positionColumnData;
          if (user.role === "ROLE_USER") {
            user.role = "Utilisateur";
          } else {
            user.role = "Administrateur";
          }
        });
        this.dataSource = new MatTableDataSource<AdminUser>(adminUsers);
      },
      (error) => {
        console.error("Error fetching users:", error);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
