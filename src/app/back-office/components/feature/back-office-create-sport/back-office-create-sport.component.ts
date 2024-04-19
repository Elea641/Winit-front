import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Sport} from "../../../../sport/models/sport.model";
import {SportService} from "../../../../sport/shared/sport.service";
import {FileUploadComponent} from "../../../../components/feature/file-upload/file-upload.component";
import {forbiddenFileFormat} from "../../../../tournament/shared/validators/forbidden-file-format.directive";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-back-office-create-sport',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FileUploadComponent, RouterLink],
  templateUrl: './back-office-create-sport.component.html',
  styleUrls: ['./back-office-create-sport.component.scss']
})
export class BackOfficeCreateSportComponent implements OnInit {

  createSportForm! : FormGroup;
  sport: Sport = {
    name: '',
    numberOfPlayers: 0,
  }

  constructor(private sportService: SportService) {
  }

  ngOnInit() {
    this.createSportForm = new FormGroup(
      {
        name: new FormControl(this.sport.name, [
          Validators.required,
          Validators.maxLength(25),
        ]),
        numberOfPlayers: new FormControl(this.sport.numberOfPlayers, [
          Validators.required
        ]),
        imageUrl: new FormControl(this.sport.imageUrl, [
          forbiddenFileFormat()
        ])
      }
    )
  }

  get name() {
    return this.createSportForm.get('name')!;
  }

  get numberOfPlayers() {
    return this.createSportForm.get('numberOfPlayers')!;
  }

  get imageUrl() {
    return this.createSportForm.get('imageUrl')!;
  }

  onSubmit() {
    if (this.createSportForm.valid) {
      const newSport: Sport = {
        name: this.name.value,
        numberOfPlayers: this.numberOfPlayers.value,
        imageUrl: this.imageUrl.value
      };
      console.log(newSport);
      //this.sportService.createSport(newSport);
    }
  }
}
