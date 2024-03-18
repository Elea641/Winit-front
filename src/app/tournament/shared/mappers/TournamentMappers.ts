import { Injectable } from "@angular/core";
import { TournamentForm } from "../../models/tournament-form.model";
import { TournamentCreationDto } from "../../models/tournament-creation-dto.model";

@Injectable({
    providedIn: 'root',
})
export class TournamentMappers {
    ToCreationDto(model: TournamentForm["form"]): TournamentCreationDto {

        const tournament: TournamentCreationDto = {
            name: model.controls["name"].value,
            date: model.controls["date"].value,
            place: model.controls["place"].value,
            sport: model.controls["sport"].value,
            playersPerTeam: model.controls["playersPerTeam"].value,
            minTeams: model.controls["minTeams"]?.value,
            maxTeams: model.controls["maxTeams"].value,
            gameLength: model.controls["gameLength"].value,
            privacy: model.controls["privacy"].value,
            playerCategory: model.controls["playerCategory"].value,
            tournamentFormat: model.controls["tournamentFormat"].value,
            tournamentBanner: model.controls["tournamentBanner"]?.value,
            inscriptionLimitDate: model.controls["inscriptionLimitDate"]?.value,
        };

        return tournament;
    }

    ToFormData(model: TournamentCreationDto): FormData {
        const formData = new FormData();

        formData.append('name', model.name);
        formData.append('date', model.date.toString());
        formData.append('place', model.place);
        formData.append('sportName', model.sport);
        formData.append('playersPerTeam', String(model.playersPerTeam));
        formData.append('maxTeams', String(model.maxTeams));
        formData.append('gameLength', String(model.gameLength));
        formData.append('privacy', model.privacy);
        formData.append('playerCategory', model.playerCategory);
        formData.append('tournamentFormat', model.tournamentFormat);

        if (model.inscriptionLimitDate) {
            formData.append('inscriptionLimitDate', model.inscriptionLimitDate.toString());
        }

        if (model.minTeams) {
            formData.append('minTeams', String(model.minTeams));
        }
        
        if (model.tournamentBanner) {
            formData.append('tournamentBanner', model.tournamentBanner);
        }

        return formData; 
    }
}