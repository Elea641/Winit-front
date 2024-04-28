import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';
import { Member } from 'src/app/team/models/member.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MemberService } from 'src/app/team/shared/member.service';
import { UserService } from 'src/app/auth/shared/user.service';
import { CurrentUser } from 'src/app/auth/models/current-user.model';
import { Observable } from 'rxjs';

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
    MatAutocompleteModule,
  ],
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.scss'],
})
export class CreateMemberComponent {
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();
  memberForm!: FormGroup;
  member: Member = new Member(0, '', '');
  users$!: Observable<CurrentUser[]>;
  teamName: string = '';

  constructor(
    public memberService: MemberService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.teamName = params['teamName'];
    });

    this.memberForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(`^[a-zA-Z0-9 ]*$`),
      ]),
    });

    this.users$ = this.userService.getAllUsers();
  }

  get name() {
    return this.memberForm.get('name')!;
  }

  selectUser(user: CurrentUser) {
    const fullName = user.firstName + ' ' + user.lastName;
    this.memberForm.get('name')!.setValue(fullName);
  }

  onSubmit() {
    if (this.memberForm.valid) {
      const selectedUserName = this.memberForm.get('name')!.value.trim();
      const [selectedUserFirstName, selectedUserLastName] =
        selectedUserName.split(' ');

      this.users$.subscribe((users) => {
        const selectedUser = users.find(
          (user) =>
            user.firstName === selectedUserFirstName &&
            user.lastName === selectedUserLastName
        );
        if (selectedUser) {
          const { id, firstName, lastName } = selectedUser;
          if (id && firstName && lastName) {
            this.member = new Member(id, firstName, lastName);
            this.memberService.addMember(this.teamName, this.member);
            this.cancelClicked.emit();
            this.memberForm.reset();
          }
        } else {
          this.toastService.showError(
            'Erreur',
            "L'utilisateur sélectionné n'a pas été trouvé"
          );
        }
      });
    } else {
      this.toastService.showError(
        'Erreur',
        'Veuillez remplir tous les champs obligatoires'
      );
    }
  }

  onClick() {
    this.cancelClicked.emit();
  }
}
