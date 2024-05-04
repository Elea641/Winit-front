import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatchService } from 'src/app/tournament/shared/match.service';
import { MatchUpdate } from 'src/app/tournament/models/matchUpdate.model';

@Component({
  selector: 'app-card-tournament-match',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './card-tournament-match.component.html',
  styleUrls: ['./card-tournament-match.component.scss'],
})
export class CardTournamentMatchComponent {
  @Input() match: any;
  @Input() matchesByPhase: any;
  @Input() phaseKey: string = '';
  scoreForm!: FormGroup;
  nextPhase!: string | null;

  constructor(private matchService: MatchService) {}

  ngOnInit() {
    this.scoreForm = new FormGroup({
      scoreTeam1: new FormControl(this.match.scoreTeam1, [
        Validators.required,
        Validators.pattern(`^[0-9]*`),
      ]),
      scoreTeam2: new FormControl(this.match.scoreTeam2, [
        Validators.required,
        Validators.pattern(`^[0-9]*`),
      ]),
    });

    this.scoreForm.valueChanges.subscribe(() => {
      this.onSubmit();
    });

    this.findNextPhase(this.phaseKey, this.matchesByPhase);
  }

  findNextPhase(phaseKey: string, matchesByPhase: any): string | null {
    if (phaseKey && matchesByPhase) {
      let maxMatchCount = 0;

      if (
        phaseKey === 'Phase préliminaire' &&
        Object.keys(matchesByPhase).length > 1
      ) {
        for (const phase in matchesByPhase) {
          if (
            Object.prototype.hasOwnProperty.call(matchesByPhase, phase) &&
            phase !== 'Phase préliminaire'
          ) {
            const matchCount = matchesByPhase[phase].length;
            if (matchCount > maxMatchCount) {
              maxMatchCount = matchCount;
              this.nextPhase = phase;
            }
          }
        }

        return this.nextPhase;
      } else {
        const currentPhaseMatchCount = matchesByPhase[phaseKey]?.length || 0;

        const filteredPhases = Object.keys(matchesByPhase).filter(
          (phase) =>
            phase !== phaseKey &&
            phase !== 'Phase préliminaire' &&
            (matchesByPhase[phase].length || 0) > currentPhaseMatchCount
        );

        for (const phase of filteredPhases) {
          const matchCount = matchesByPhase[phase].length;
          if (matchCount > maxMatchCount) {
            maxMatchCount = matchCount;
            this.nextPhase = phase;
          }
        }
        return this.nextPhase;
      }
    }
    return null;
  }

  findMatchWithStatus(
    phase: string,
    matchesByPhase: any
  ): { id: number; team: string } | null {
    if (phase && matchesByPhase) {
      const matches = matchesByPhase[phase];

      const matchWithStatus = matches.find(
        (match: any) =>
          match.team1 === 'En attente' || match.team2 === 'En attente'
      );

      if (matchWithStatus) {
        const team =
          matchWithStatus.team1 === 'En attente'
            ? matchWithStatus.team1
            : matchWithStatus.team2;

        return {
          id: matchWithStatus.id,
          team: team === matchWithStatus.team1 ? 'team1' : 'team2',
        };
      }
    }
    return null;
  }

  onSubmit() {
    if (this.nextPhase) {
      const nextTeamInfo = this.findMatchWithStatus(
        this.nextPhase,
        this.matchesByPhase
      );

      if (this.scoreForm.valid) {
        const data: MatchUpdate = {
          id: this.match.id,
          scoreTeam1: this.scoreForm.value.scoreTeam1,
          scoreTeam2: this.scoreForm.value.scoreTeam2,
          nextTeamInfo: { id: nextTeamInfo?.id, team: nextTeamInfo?.team },
        };

        this.matchService.updateMatch(data);
      }
    }
  }
}
