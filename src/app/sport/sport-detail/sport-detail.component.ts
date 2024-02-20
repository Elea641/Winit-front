import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sport-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sport-detail.component.html',
  styleUrls: ['./sport-detail.component.scss'],
})
export class SportDetailComponent {
  @Input() sport: any;
  image: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(`http://localhost:8080/uploads/${this.sport.imageUrl}`, {
        responseType: 'blob',
      })
      .subscribe((response) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.image = reader.result as string;
        };
        reader.readAsDataURL(response);
      });
  }
}
