import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploadComponent } from '../../../../components/feature/file-upload/file-upload.component';
import { forbiddenFileFormat } from '../../../../tournament/shared/validators/forbidden-file-format.directive';
import { Router, RouterLink } from '@angular/router';
import { BackOfficeSportService } from '../../../shared/back-office-sport.service';
import { AdminSport } from '../../../models/admin-sport.model';
import { ToastService } from '../../../../shared/toast.service';

@Component({
  selector: 'app-back-office-create-sport',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FileUploadComponent,
    RouterLink,
  ],
  templateUrl: './back-office-create-sport.component.html',
  styleUrls: ['./back-office-create-sport.component.scss'],
})
export class BackOfficeCreateSportComponent implements OnInit {
  createSportForm!: FormGroup;
  sport: AdminSport = {};

  constructor(
    private sportService: BackOfficeSportService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.createSportForm = new FormGroup({
      name: new FormControl(this.sport.name, [
        Validators.required,
        Validators.maxLength(25),
      ]),
      numberOfPlayers: new FormControl(this.sport.numberOfPlayers, [
        Validators.required,
        Validators.min(1),
      ]),
      imageFile: new FormControl(this.sport.imageFile, [forbiddenFileFormat()]),
    });
  }

  get name() {
    return this.createSportForm?.get('name');
  }

  get numberOfPlayers() {
    return this.createSportForm?.get('numberOfPlayers');
  }

  get imageFile() {
    return this.createSportForm?.get('imageFile');
  }

  onSubmit() {
    if (this.createSportForm.valid) {
      const formData = new FormData();
      formData.append('name', this.name?.value);
      formData.append(
        'numberOfPlayers',
        this.numberOfPlayers?.value.toString()
      );
      formData.append('imageFile', this.imageFile?.value);
      this.sportService.createSport(formData).subscribe({
        next: response => {
          if (response) {
            this.router.navigate(['/back-office']);
            this.toastService.showSuccess(
              'Le sport a bien été créé',
              'Succès !'
            );
          }
        },
        error: () => {
          this.toastService.showError(
            'Impossible de créer ce sport.',
            'Une erreur est survenue'
          );
        },
      });
    }
  }
}
