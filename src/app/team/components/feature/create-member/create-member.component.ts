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
  member: Member = new Member('');
  teamName: string = '';

  constructor(
    public memberService: MemberService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.teamName = params['teamName'];
    });

    this.memberForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(
          `[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]*`
        ),
      ]),
    });
  }

  get name() {
    return this.memberForm.get('name')!;
  }

  onSubmit() {
    if (this.memberForm.valid) {
      this.member = new Member(this.name.value);
      if (this.teamName) {
        this.memberService.addMember(this.teamName, this.member);
        this.cancelClicked.emit();
      }
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
