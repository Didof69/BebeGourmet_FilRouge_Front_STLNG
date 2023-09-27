import { Component } from '@angular/core';
import { LoginUtilisateur } from 'src/app/models/loginUtilisteur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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

  isFormValidate = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  connecter(connexionForm: NgForm) {
    this.isFormValidate = true;

    if (connexionForm.valid) {
      this.utilisateurService.connexionUtilisateur(this.utilisateur).subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.accessToken);
          location.reload(); //recharge la page actuelle
        },
        error: (error) => {
        },
      });
    }
  }
}
