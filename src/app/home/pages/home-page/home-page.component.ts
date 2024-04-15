import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { CarouselComponent } from 'src/app/components/ui/carousel/carousel.component';
import { SidebarComponent } from 'src/app/components/ui/sidebar/sidebar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [
    CommonModule,
    CarouselComponent,
    SidebarComponent,
    MatDividerModule,
  ],
})
export class HomePageComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthentication(); // Appel de la méthode pour vérifier l'authentification
  }

  checkAuthentication(): void {
    // Appelez votre endpoint pour vérifier l'authentification de l'utilisateur
    this.authService.checkAuthentication().subscribe(
      (response) => {
        // L'utilisateur est authentifié, vous pouvez gérer la réponse comme vous le souhaitez
        console.log('User is authenticated', response);
      },
      (error) => {
        // Une erreur s'est produite ou l'utilisateur n'est pas authentifié
        console.error('Error while checking authentication', error);
        // Vous pouvez rediriger l'utilisateur vers la page de connexion ou afficher un message d'erreur, selon vos besoins
      }
    );
  }
}
