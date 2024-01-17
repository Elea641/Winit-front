import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {RegisterComponent} from "../../components/feature/register/register.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterComponent],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

}
