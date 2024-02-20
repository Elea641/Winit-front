import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { minimumDate } from "../shared/validators/minimum-date.directive";
import { SportService } from "src/app/shared/sport.service";
import { FileInputValidators } from "@ngx-dropzone/cdk";
import { maximumDate } from "../shared/validators/maximum-date.directive";
import { allowedSports } from "../shared/validators/allowed-sports.directive";
import { enumValidator } from "../shared/validators/allowed-enums.directive";
import { TournamentPrivacyEnum } from "./enum/tournamentPrivacyEnum";
import { PlayerCategoryEnum } from "./enum/playerCategoryEnum";
import { TournamentFormatEnum } from "./enum/tournamentFormatEnum";
import { forbiddenFileFormat } from "../shared/validators/forbidden-file-format.directive";


export class TournamentForm {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private sportService: SportService) {
        this.form = this.createForm();
    }

    private createForm() {
        return this.fb.group({
            name: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30)
            ]],
            place: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)
            ]],
            date: ['', [
                Validators.required,
                minimumDate()
            ]],
            inscriptionLimitDate: [''],
            sport: ['', [
                Validators.required,
                allowedSports(this.sportService)
            ]],
            playersPerTeam: ['', Validators.required],
            minTeams: [''],
            maxTeams: ['', Validators.required],
            gameLength: ['', Validators.required],
            privacy: ['', [
                Validators.required,
                enumValidator(TournamentPrivacyEnum)
            ]],
            playerCategory: ['', [
                Validators.required,
                enumValidator(PlayerCategoryEnum)
            ]],
            tournamentFormat: ['', [
                Validators.required,
                enumValidator(TournamentFormatEnum)
            ]],
            tournamentBanner: [null,
                // [FileInputValidators.accept("image/*")]
                forbiddenFileFormat(),
            ]
        }, { validators: maximumDate })
    }
}