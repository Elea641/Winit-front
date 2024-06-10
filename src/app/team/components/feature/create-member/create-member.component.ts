import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';
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
export class CreateMemberComponent implements OnInit {
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();
  addMemberForm!: FormGroup;
  teamName = '';

  constructor(
    public memberService: MemberService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.params) {
      this.route.params.subscribe(params => {
        this.teamName = params['teamName'];
      });
    }

    this.addMemberForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get email() {
    return this.addMemberForm.get('email');
  }

  onSubmit() {
    if (this.addMemberForm.valid) {
      const memberData = {
        email: this.email?.value.trim(),
      };
      this.memberService.addMember(this.teamName, memberData);
      this.cancelClicked.emit();
      this.addMemberForm.reset();
    } else {
      this.toastService.showError(
        'Veuillez remplir tous les champs obligatoires',
        'Erreur'
      );
    }
  }

  onClick() {
    this.cancelClicked.emit();
  }
}
