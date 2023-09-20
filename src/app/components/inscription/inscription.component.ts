import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  utilisateur: Utilisateur = {
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe:'',
    admin: false    
  };
 
  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  inscrire() {
    this.utilisateurService.inscriptionUtilisateur(this.utilisateur).subscribe({
      next: (response) => {
        console.log("Inscription réussie:", response);  
        this.router.navigate(['/profil-utilisateur/inscription']);  
      },
      error: (error) => {
        console.log("Echec de l'inscription", error); 
      }
    });
  }
}