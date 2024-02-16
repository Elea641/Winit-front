import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {Sport} from "../../../../auth/models/sport.model";
import {User} from "../../../../auth/models/user.model";
import {ProfileService} from "../../../shared/profile.service";

@Component({
  selector: 'app-update-profile',
  standalone: true,
    imports: [CommonModule, FormsModule, MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  updateProfileForm!: FormGroup;
  sports: Sport[] = [
    { name: 'basketball', viewName: 'Basketball' },
    { name: 'esport', viewName: 'E-sport' },
    { name: 'football', viewName: 'Football' },
    { name: 'handball', viewName: 'Handball' },
    { name: 'petanque', viewName: 'Pétanque' },
    { name: 'volleyball', viewName: 'Volleyball' },
    { name: 'waterpolo', viewName: 'Water-polo' },
  ];
  user: User = {
    firstName: 'Coline',
    lastName: 'Guerin',
    email: 'coco@gmail.com',
  };

  constructor(
    private profileService: ProfileService
  ) {  }

  ngOnInit(): void {
    this.updateProfileForm = new FormGroup(
      {
        firstName: new FormControl(this.user.firstName, [
          Validators.required,
          Validators.maxLength(25),
        ]),
        lastName: new FormControl(this.user.lastName, [
          Validators.required,
          Validators.maxLength(25),
        ]),
        city: new FormControl(this.user.city, [
          Validators.maxLength(25),
        ]),
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.email,
        ]),
        // sport: new FormControl(this.user.sport, []),
      },
    );
  }

  get firstName() {
    return this.updateProfileForm.get('firstName')!;
  }

  get lastName() {
    return this.updateProfileForm.get('lastName')!;
  }

  get city() {
    return this.updateProfileForm.get('city')!;
  }

  get email() {
    return this.updateProfileForm.get('email')!;
  }

  // get sport() {
  //   return this.updateProfileForm.get('sport')!;
  // }

  onSubmit() {
    if (this.updateProfileForm.valid) {
      this.profileService.updateProfile(4, this.updateProfileForm.value)
        .subscribe(response => {
          console.log('Profile has been updated: ', this.updateProfileForm.value);
      },
          (error) => {
            console.error('Error:', error);
          });
    }
  }


}
