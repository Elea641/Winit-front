import { FormBuilder, FormGroup, Validators } from "@angular/forms";


export class TournamentForm {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.createForm();
    }

    private createForm() {
        return this.fb.group({
            id: [null],
            name: ['', Validators.required],
            place: ['', Validators.required],
            date: ['', Validators.required],
            sport: ['', Validators.required],
            playersPerTeam: ['', Validators.required],
            minTeams: ['', Validators.required],
            maxTeams: ['', Validators.required],
            gameLength: ['', Validators.required],
            privacy: ['', Validators.required],
            playerCategory: ['', Validators.required],
            tournamentFormat: ['', Validators.required],
            tournamentBanner: ['']
        })
    }
}