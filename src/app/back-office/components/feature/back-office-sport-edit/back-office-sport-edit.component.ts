import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileUploadComponent } from '../../../../components/feature/file-upload/file-upload.component';
import { AdminSport } from '../../../models/admin-sport.model';
import { ToastService } from '../../../../shared/toast.service';
import { BackOfficeSportService } from '../../../shared/back-office-sport.service';
import { forbiddenFileFormat } from '../../../../tournament/shared/validators/forbidden-file-format.directive';
import { GetImageService } from '../../../../shared/get-image.service';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-back-office-sport-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    RouterLink,
    FileUploadComponent,
    MatCardModule,
  ],
  templateUrl: './back-office-sport-edit.component.html',
  styleUrls: ['./back-office-sport-edit.component.scss'],
})
export class BackOfficeSportEditComponent implements OnInit {
  sport: AdminSport | undefined;
  editSportForm!: FormGroup;
  public currentImage!: string | Blob;

  constructor(
    private route: ActivatedRoute,
    private sportService: BackOfficeSportService,
    private toastService: ToastService,
    private router: Router,
    private imageService: GetImageService
  ) {}

  ngOnInit(): void {
    if (this.route.params) {
      this.route.params.subscribe(params => {
        const id = params['id([0-9]+)'];
        this.getSportDetails(id);
      });
    }

    this.editSportForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      numberOfPlayers: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      imageFile: new FormControl(null, [forbiddenFileFormat()]),
    });
  }

  private getSportDetails(id: number) {
    this.sportService.getSportById(id).subscribe((sport: AdminSport) => {
      this.sport = sport;
      this.displayImage(sport.imageUrl);
      this.patchValues(sport);
    });
  }

  private patchValues(sport: AdminSport) {
    this.editSportForm.patchValue({
      name: sport.name,
      numberOfPlayers: sport.numberOfPlayers,
      imageFile: sport.imageFile,
    });
  }

  private displayImage(imageUrl: any) {
    this.imageService.getImage(imageUrl).subscribe(data => {
      this.currentImage = data;
    });
  }

  get name() {
    return this.editSportForm?.get('name');
  }

  get numberOfPlayers() {
    return this.editSportForm?.get('numberOfPlayers');
  }

  get imageFile() {
    return this.editSportForm?.get('imageFile');
  }

  onSubmit() {
    if (this.editSportForm.valid) {
      const formData: FormData = this.createFormData();
      this.route.params.subscribe(params => {
        const sportId = params['id([0-9]+)'];
        this.sportService.editSport(sportId, formData).subscribe({
          next: () => {
            this.toastService.showSuccess(
              'Le sport a bien été mis à jour.',
              'Succès !'
            );
            this.router.navigate(['/back-office']);
          },
          error: () => {
            this.toastService.showError(
              "Le sport n'a pas pu être mis à jour, veuillez réessayer ultérieurement.",
              'Une erreur est survenue'
            );
          },
        });
      });
    }
  }

  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('name', this.name?.value);
    formData.append('numberOfPlayers', this.numberOfPlayers?.value.toString());
    formData.append('imageFile', this.imageFile?.value);

    return formData;
  }
}
