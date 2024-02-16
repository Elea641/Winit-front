import { FormBuilder, FormGroup, Validators } from "@angular/forms";


export class TournamentForm {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
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
                Validators.maxLength(30)
            ]],
            date: ['', [
                Validators.required,
                // dateTournamentCreationValidator()
            ]],
            inscriptionLimitDate: [''],
            sport: ['', [
                Validators.required,
                // sportTournamentCreationValidator()
            ]],
            playersPerTeam: ['', Validators.required],
            minTeams: [''],
            maxTeams: ['', Validators.required],
            gameLength: ['', Validators.required],
            privacy: ['', [
                Validators.required,
                // privacyTournamentCreationValidator()
            ]],
            playerCategory: ['', [
                Validators.required,
                // playerCategoryTournamentCreationValidator()
            ]],
            tournamentFormat: ['', [
                Validators.required,
                // formatTournamentCreationValidator()
            ]],
            tournamentBanner: [null,
                // bannerTournamentCreationValidator() 
            ]
        })
    }
}