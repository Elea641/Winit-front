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
  ],
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.scss'],
})
export class CreateMemberComponent {
  memberForm!: FormGroup;
  member: Member = new Member('');
  teamName: string = '';

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

    this.route.parent?.params.subscribe((params) => {
      this.teamName = params['teamName'];
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
