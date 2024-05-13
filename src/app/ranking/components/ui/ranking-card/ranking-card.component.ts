import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopWinnerTeamCountDto } from 'src/app/ranking/models/topWinnerTeamCountDto.model';
import { TopWinnerTeamDto } from 'src/app/ranking/models/topWinnerTeamDto.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TopWinnerTeamDtoType } from 'src/app/ranking/models/topWinnerTeamDtoType.model';

@Component({
  selector: 'app-ranking-card',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './ranking-card.component.html',
  styleUrls: ['./ranking-card.component.scss'],
})
export class RankingCardComponent {
  @Input() topWinnerTeamCountDtos!: TopWinnerTeamCountDto[] | null;
  @Input() topWinnerTeamDtos!: TopWinnerTeamDto[] | null;

  displayedColumns!: string[];
  dataSource!: MatTableDataSource<
    TopWinnerTeamCountDto | TopWinnerTeamDto | null
  >;

  ngOnInit() {
    if (this.topWinnerTeamCountDtos) {
      this.dataSource = new MatTableDataSource<TopWinnerTeamDtoType>(
        this.topWinnerTeamCountDtos
      );
      this.displayedColumns = ['number', 'name', 'sport', 'win'];
    }

    if (this.topWinnerTeamDtos) {
      this.dataSource = new MatTableDataSource<TopWinnerTeamDtoType>(
        this.topWinnerTeamDtos
      );
      this.displayedColumns = ['number', 'name', 'sport', 'tounamentName'];
    }
  }
}
