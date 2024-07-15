import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperProfileService } from 'src/app/profile/shared/helpers/helper-profile.service';
import {
  StatesEnumType,
  StatesType,
} from 'src/app/profile/models/state-type.model';

@Component({
  selector: 'app-card-result-tournament',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-result-tournament.component.html',
  styleUrls: ['./card-result-tournament.component.scss'],
})
export class CardResultTournamentComponent implements OnInit {
  @Input() result!: StatesEnumType | StatesType;
  convertedResult: string | number | undefined;
  convertedResultToString: string | undefined;

  constructor(private helperProfileService: HelperProfileService) {}

  ngOnInit(): void {
    if (this.result && this.result.length > 0) {
      this.convertedResult = this.helperProfileService.resultsToNumber(
        this.result[0]
      );
      this.convertedResultToString = this.helperProfileService.resultsToString(
        this.result[0]
      );
    }
  }
}
