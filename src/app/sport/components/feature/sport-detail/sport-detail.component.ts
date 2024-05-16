import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GetImageService } from 'src/app/shared/get-image.service';

@Component({
  selector: 'app-sport-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sport-detail.component.html',
  styleUrls: ['./sport-detail.component.scss'],
})
export class SportDetailComponent implements OnInit {
  @Input() sport: any;
  image: any;

  constructor(private getImageService: GetImageService) {}

  ngOnInit() {
    this.getImageService.getImage(this.sport?.imageUrl).subscribe(data => {
      this.image = data;
    });
  }
}
