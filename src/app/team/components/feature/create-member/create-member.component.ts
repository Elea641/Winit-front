import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TeamService } from 'src/app/team/shared/team.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Member } from 'src/app/team/models/member.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CurrentUser } from 'src/app/auth/models/current-user.model';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-member',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
    RouterModule,
    MatAutocompleteModule,
  ],
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.scss'],
})
export class CreateMemberComponent {
  memberForm!: FormGroup;
  member: Member = new Member('');
  teamName: string = '';
  users: CurrentUser[] = [];
  filteredUsers!: Observable<CurrentUser[]>;

  constructor(
    public teamService: TeamService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.memberForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(
          `[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]*`
        ),
      ]),
    });

    this.route.params.subscribe((params) => {
      this.teamName = params['teamName'];
    });

    this.route.data.subscribe(({ user }) => {
      this.users = user;
    });

    this.filteredUsers = this.memberForm.controls['name'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): CurrentUser[] {
    const filterValue = value?.toLowerCase();
    return this.users?.filter((user: CurrentUser) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(filterValue);
    });
  }

  get name() {
    return this.memberForm.get('name')!;
  }

  onSubmit() {
    if (this.memberForm.valid) {
      this.member = new Member(this.name.value);
      if (this.teamName) {
        this.teamService.addMember(this.teamName, this.member);
        this.memberForm.reset();
      }
    } else {
      this.toastService.showError(
        'Erreur',
        'Veuillez remplir tous les champs obligatoires'
      );
    }
  }

  onClick() {
    this.router.navigate([`/teams-details/${this.teamName}/list-member`]);
  }
}
