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
            date: ['', Validators.required],
            inscriptionLimitDate: ['', Validators.required],
            place: ['', Validators.required],
            sport: ['', Validators.required],
            maxPlayers: [null, Validators.required],
        })
    }
}