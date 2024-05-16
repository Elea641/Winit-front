import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { forbiddenFileFormat } from '../shared/validators/forbidden-file-format.directive';
import { SportService } from 'src/app/sport/shared/sport.service';
import { minimumDate } from '../shared/validators/minimum-date.directive';
import { allowedSports } from '../shared/validators/allowed-sports.directive';
import { maximumDate } from '../shared/validators/maximum-date.directive';

export class TournamentForm {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sportService: SportService
  ) {
    this.form = this.createForm();
  }

  private createForm() {
    return this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        place: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        date: ['', [Validators.required, minimumDate()]],
        inscriptionLimitDate: [''],
        sport: ['', [Validators.required, allowedSports(this.sportService)]],
        maxTeams: ['', Validators.required],
        tournamentBanner: [null, [forbiddenFileFormat(), Validators.required]],
      },
      { validators: maximumDate }
    );
  }
}
