import { Component } from '@angular/core';
import { LoginUtilisateur } from 'src/app/models/loginUtilisteur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  utilisateur: LoginUtilisateur = {
    email: '',
    mot_de_passe: '',
  };

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) { }
  
  connecter() {
    this.utilisateurService.connexionUtilisateur(this.utilisateur).subscribe({
      next: (response) => {
        console.log('Connexion réussie:', response);
        console.log('Token reçu:', response.accessToken);

        localStorage.setItem('token', response.accessToken);

        this.router.navigate(['/profil-utilisateur']);
      },
      error: (error) => {
        console.log('Échec de la connexion', error);
      },
    });
  }
}
