import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-profil-utilisateur',
  templateUrl: './profil-utilisateur.component.html',
  styleUrls: ['./profil-utilisateur.component.css'],
})
export class ProfilUtilisateurComponent {
  @Input() profil!: Utilisateur;

  constructor(private router: Router) {}

  getInitials(): string {
    if (this.profil.nom && this.profil.prenom) {
      return (
        this.profil.nom.charAt(0).toUpperCase() +
        this.profil.prenom.charAt(0).toUpperCase()
      );
    }
    return '';
  }

  deconnexion() {
    localStorage.clear()
    location.reload();
  }
}
