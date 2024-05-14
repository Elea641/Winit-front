import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { DropzoneMaterialModule } from '@ngx-dropzone/material';
import { FileUploadComponent } from '../../../components/feature/file-upload/file-upload.component';
import { SportListComponent } from '../../components/feature/sport-list/sport-list.component';
import { Sport } from '../../models/sport.model';

@Component({
  selector: 'app-sport',
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
    DropzoneCdkModule,
    DropzoneMaterialModule,
    FileUploadComponent,
    SportListComponent,
  ],
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss'],
})
export class SportComponent implements OnInit {
  sportForm!: FormGroup;
  newSport: Sport = new Sport('', 0);
  newFile: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.sportForm = new FormGroup({
      name: new FormControl('ghvbjn', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      numberOfPlayers: new FormControl(3, Validators.required),
    });
  }

  onSubmit() {
    if (this.sportForm.valid) {
      this.newSport.name = this.sportForm.get('name')?.value;
      this.newSport.numberOfPlayers =
        this.sportForm.get('numberOfPlayers')?.value;
      this.newFile = this.sportForm.get('image')?.value;
      const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
      const formData = new FormData();
      formData.set('name', this.newSport.name);
      formData.set('numberOfPlayers', this.newSport.numberOfPlayers.toString());
      formData.set('newFile', this.newFile);
      this.http.post<any>('http://localhost:8080/api/sports/new', formData, {
        headers,
      });
    }
  }
}
