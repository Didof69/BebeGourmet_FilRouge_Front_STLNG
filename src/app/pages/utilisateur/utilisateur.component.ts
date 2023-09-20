import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css'],
})
export class UtilisateurComponent {
  utilisateur!: Utilisateur ;
  affichage: boolean = false //permet de savoir quel compsant affiché
  
  constructor(
    private utilisateurService: UtilisateurService,
  ) {}

  ngOnInit(): void {

    this.utilisateurService.getProfilUtilisateur().subscribe({
        next: (response) => {
        console.log('retour get user:', response);
        this.affichage = true //modifie le composant à afficher
        this.utilisateur = response
        localStorage.setItem('profilUtilisateur',this.utilisateur.admin.toString())
        },
        error: (error) => {
          console.log("Echec get user", error);
        },
      });
    

  }
}
