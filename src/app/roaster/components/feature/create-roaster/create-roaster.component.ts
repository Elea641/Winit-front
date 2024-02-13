import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Roaster } from 'src/app/roaster/models/roaster.model';
import { RoasterService } from 'src/app/roaster/shared/roaster.service';
import { SportService } from 'src/app/shared/sport.service';
import { Sport } from 'src/app/models/sport.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-roaster',
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
    MatSelectModule,
  ],
  templateUrl: './create-roaster.component.html',
  styleUrls: ['./create-roaster.component.scss'],
})
export class CreateRoasterComponent {
  roasterForm!: FormGroup;
  roaster: Roaster = new Roaster('', '');
  sports: Sport[] = [];

  constructor(
    public roasterService: RoasterService,
    private sportService: SportService
  ) {}

  ngOnInit(): void {
    this.roasterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      sport: new FormControl('', [Validators.required]),
    });

    this.sportService.getAllSports().subscribe((sports) => {
      this.sports = sports;
    });
  }

  get name() {
    return this.roasterForm.get('name')!;
  }

  get sport() {
    return this.roasterForm.get('sport')!;
  }

  onSubmit() {
    this.roaster = new Roaster(this.name.value, this.sport.value);
    console.log(this.roaster);

    this.roasterService.addRoaster(this.roaster);
  }
}
