import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
  // subUser$!: Observable<Utilisateur>; //à creuser
  
  constructor(
    private utilisateurService: UtilisateurService,
  ) {}

  ngOnInit(): void {
    // this.subUser$ = this.utilisateurService.getProfilUtilisateur(); //à creuser
    this.utilisateurService.getProfilUtilisateur().subscribe({
        next: (response) => {
        console.log('retour get user:', response);
        this.affichage = true //modifie le composant à afficher
        this.utilisateur = response
      },
      error: (error) => {
          this.affichage = true //modifie le composant à afficher
          console.log("Echec get user", error);
      }
      });
  }
}
