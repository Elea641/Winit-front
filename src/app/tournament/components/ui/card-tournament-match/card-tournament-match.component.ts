import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointService } from 'src/app/shared/breakpoint.service';

@Component({
  selector: 'app-card-tournament-match',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-tournament-match.component.html',
  styleUrls: ['./card-tournament-match.component.scss'],
})
export class CardTournamentMatchComponent implements OnInit {
  @Input() namesTeamList: any;
  @Input() indexRemainingTeams: any;
  @Input() indexRandomTeams: any;
  @Input() randomMatchs: any;
  @Input() totalPhaseMatchs: any;
  @Input() isLastIteration: boolean = false; 
  isDesktop: boolean | undefined = false;
  isLargeDesktop: boolean | undefined = false;
  margin: number = 0;
  isEven: string = '';
  marginCalcul!: number;

  constructor(private breakpointService: BreakpointService) {}

  ngOnInit(): void {
    if (this.namesTeamList.isEven === true) {
      this.isEven = 'even';
    } else {
      this.isEven = 'odd';
    }

    this.marginCalculator(this.indexRemainingTeams, this.indexRandomTeams);

    this.isDesktop = this.breakpointService.isDesktopDevice();
    this.breakpointService.deviceChanged['isDesktop'].subscribe(
      (isDesktop: boolean) => {
        this.isDesktop = isDesktop;
      }
    );

    this.isLargeDesktop = this.breakpointService.isLargeDesktopDevice();
    this.breakpointService.deviceChanged['isLargeDesktop'].subscribe(
      (isLargeDesktop: boolean) => {
        this.isLargeDesktop = isLargeDesktop;
      }
    );    

    console.log(this.indexRemainingTeams);
    
  }

  marginCalculator(indexRemainingTeams: number, indexRandomTeams: number) {
    if (indexRemainingTeams === 0) {
      this.margin = (2 ** (indexRemainingTeams + 2.6)) - 2;
    } else if (indexRemainingTeams > 0) {
      this.margin = (2 ** (indexRemainingTeams + 3)) - 2;
    } else if (indexRandomTeams) {
      this.margin = 2;
    }
  }
}
