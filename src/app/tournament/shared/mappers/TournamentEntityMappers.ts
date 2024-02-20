import { Injectable } from "@angular/core";
import { TournamentForm } from "../../models/tournament-form.model";
import { Tournament } from "../../models/tournament.model";

@Injectable({
    providedIn: 'root',
})
export class TournamentEntityMappers {
    ToCreationEntity(model: TournamentForm["form"]): Tournament {

        const tournament: Tournament = {
            id: 0,
            name: model.controls["name"].value,
            date: model.controls["date"].value,
            place: model.controls["place"].value,
            sport: model.controls["sport"].value,
            playersPerTeam: model.controls["playersPerTeam"].value,
            maxPlayers: model.controls["maxPlayers"]?.value,
            minTeams: model.controls["minTeams"]?.value,
            maxTeams: model.controls["maxTeams"].value,
            gameLength: model.controls["gameLength"].value,
            privacy: model.controls["privacy"].value,
            playerCategory: model.controls["playerCategory"].value,
            tournamentFormat: model.controls["tournamentFormat"].value,
            tournamentBanner: model.controls["tournamentBanner"]?.value,
            inscriptionLimitDate: model.controls["inscriptionLimitDate"]?.value,
            currentPlayers: model.controls["currentPlayers"]?.value,
        };

        return tournament;
    }
}