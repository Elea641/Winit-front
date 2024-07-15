import { Injectable } from '@angular/core';
import { TournamentForm } from '../../models/tournament-form.model';
import { TournamentCreationDto } from '../../models/tournament-creation-dto.type';

@Injectable({
  providedIn: 'root',
})
export class TournamentMappers {
  toCreationDto(model: TournamentForm['form']): TournamentCreationDto {
    const tournament: TournamentCreationDto = {
      name: model.controls['name'].value,
      date: model.controls['date'].value,
      place: model.controls['place'].value,
      sport: model.controls['sport'].value,
      maxTeams: model.controls['maxTeams'].value,
      tournamentBanner: model.controls['tournamentBanner']?.value,
      inscriptionLimitDate: model.controls['inscriptionLimitDate']?.value,
    };

    return tournament;
  }

  toFormData(model: TournamentCreationDto): FormData {
    const formData = new FormData();

    formData.append('name', model.name);
    formData.append('date', model.date.toString());
    formData.append('place', model.place);
    formData.append('sportName', model.sport);
    formData.append('maxTeams', String(model.maxTeams));

    if (model.inscriptionLimitDate) {
      formData.append(
        'inscriptionLimitDate',
        model.inscriptionLimitDate.toString()
      );
    }

    if (model.tournamentBanner) {
      formData.append('tournamentBanner', model.tournamentBanner);
    }

    return formData;
  }
}
