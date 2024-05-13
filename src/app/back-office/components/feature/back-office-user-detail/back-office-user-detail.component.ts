import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {BackOfficeUserService} from "../../../shared/back-office-user.service";
import {AdminUser} from "../../../models/admin-user.model";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'app-back-office-user-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule],
  templateUrl: './back-office-user-detail.component.html',
  styleUrls: ['./back-office-user-detail.component.scss']
})
export class BackOfficeUserDetailComponent implements OnInit {

  user: AdminUser | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: BackOfficeUserService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id([0-9]+)'];
      this.getUserDetails(id);
    })
  }

  private getUserDetails(id: number) {
    this.userService.getUserById(id).subscribe(
      (user: AdminUser) => {
        this.user = user;
        if (user.role === "ROLE_USER") {
          user.role = "Utilisateur";
        } else {
          user.role = "Administrateur";
        }
      },
      (error) => {
        console.error("Error fetching user with id " + id + ": ", error);
      }
    )
  }
}
