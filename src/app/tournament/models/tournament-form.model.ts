import { FormBuilder, FormGroup, Validators } from "@angular/forms";


export class TournamentForm {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.createForm();
    }

    private createForm() {
        return this.fb.group({
            name: ['', Validators.required],
            place: ['', Validators.required],
            date: ['', Validators.required],
            inscriptionLimitDate: [''],
            sport: ['', Validators.required],
            playersPerTeam: ['', Validators.required],
            minTeams: [''],
            maxTeams: ['', Validators.required],
            gameLength: ['', Validators.required],
            privacy: ['', Validators.required],
            playerCategory: ['', Validators.required],
            tournamentFormat: ['', Validators.required],
            tournamentBanner: [null]
        })
    }
}