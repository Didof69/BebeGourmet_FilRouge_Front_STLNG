import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent {
  utilisateur: Utilisateur = {
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    mot_de_passe_confirme: '',
    admin: false,
  };

  confirmMdpError = false;

  isFormSubmit = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  inscrire(inscriptionForm: NgForm) {
    this.isFormSubmit = true;

    // Verifier si les mots de passe correspondent
    this.confirmMdpError =
      this.utilisateur.mot_de_passe !== this.utilisateur.mot_de_passe_confirme;

    if (inscriptionForm.valid && !this.confirmMdpError) {
      // Si tous les champs sont valides, alors continuez avec l'inscription.
      this.utilisateurService
        .inscriptionUtilisateur(this.utilisateur)
        .subscribe({
          next: (response) => {
            console.log('Inscription réussie:', response);
            this.router.navigate(['/profil-utilisateur']);
          },
          error: (error) => {
            console.log("Echec de l'inscription", error);
          },
        });
    }
  }
}
