import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertWinEnum } from 'src/app/profile/models/enum/convertWinEnum';
import { HelperProfileService } from 'src/app/profile/shared/helpers/helper-profile.service';

@Component({
  selector: 'app-card-result-tournament',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-result-tournament.component.html',
  styleUrls: ['./card-result-tournament.component.scss'],
})
export class CardResultTournamentComponent {
  @Input() result!: any;
  convertedResult: string | number | undefined;
  convertedResultToString: string | undefined;

  constructor(private helperProfileService: HelperProfileService) {}

  ngOnInit(): void {
    if (this.result && this.result[0]) {
      this.convertedResult = this.helperProfileService.resultatsToNumber(
        this.result[0]
      );
      this.convertedResultToString =
        this.helperProfileService.resultatsToString(this.result[0]);
    }
  }
}
