import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from "@angular/material/divider";
import {CreateTeamComponent} from "../../../../team/components/feature/create-team/create-team.component";
import {ListResultatsComponent} from "../../../../profile/components/feature/list-resultats/list-resultats.component";
import {ListTeamComponent} from "../../../../team/components/feature/list-team/list-team.component";
import {MatTabsModule} from "@angular/material/tabs";
import {BackOfficeSportsTableComponent} from "../back-office-sports-table/back-office-sports-table.component";

@Component({
  selector: 'app-back-office-layout',
  standalone: true,
  imports: [CommonModule, MatDividerModule, CreateTeamComponent, ListResultatsComponent, ListTeamComponent, MatTabsModule, BackOfficeSportsTableComponent],
  templateUrl: './back-office-layout.component.html',
  styleUrls: ['./back-office-layout.component.scss']
})
export class BackOfficeLayoutComponent {

}
