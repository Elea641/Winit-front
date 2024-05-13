import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SportDetailComponent } from '../sport-detail/sport-detail.component';

@Component({
  selector: 'app-sport-list',
  standalone: true,
  imports: [CommonModule, SportDetailComponent],
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.scss'],
})
export class SportListComponent {
  sports$: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8080/api/sports/').subscribe({
      next: (data) => {
        this.sports$ = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
