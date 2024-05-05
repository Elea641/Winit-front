import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreModalContent } from 'src/app/tournament/models/ScoreModal.model';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatchService } from 'src/app/tournament/shared/match.service';
import { MatButtonModule } from '@angular/material/button';
import { MatchUpdate } from 'src/app/tournament/models/matchUpdate.model';

@Component({
  selector: 'app-score-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './score-modal.component.html',
  styleUrls: ['./score-modal.component.scss'],
})
export class ScoreModalComponent {
  content: ScoreModalContent = new ScoreModalContent({
    match: {},
    nextPhase: '',
    nextTeamInfo: {},
  });
  scoreForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ScoreModalComponent>,
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    this.content = this.data;

    this.scoreForm = new FormGroup({
      scoreTeam1: new FormControl(this.content.match.scoreTeam1, [
        Validators.required,
        Validators.pattern(`^[0-9]*`),
      ]),
      scoreTeam2: new FormControl(this.content.match.scoreTeam2, [
        Validators.required,
        Validators.pattern(`^[0-9]*`),
      ]),
    });
  }

  onSubmit() {
    if (this.scoreForm.valid) {
      const data: MatchUpdate = {
        id: this.content.match.id,
        scoreTeam1: parseInt(this.scoreForm.value.scoreTeam1, 10),
        scoreTeam2: parseInt(this.scoreForm.value.scoreTeam2, 10),
        nextTeamInfo: {
          id: this.content.nextTeamInfo?.id,
          team: this.content.nextTeamInfo?.team,
        },
      };
      this.matchService.updateMatch(data);
    }
  }
}
