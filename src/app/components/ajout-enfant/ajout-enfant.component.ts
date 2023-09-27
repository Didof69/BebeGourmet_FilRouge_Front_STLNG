import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Enfant } from 'src/app/models/enfant';
import { Restriction } from 'src/app/models/restriction';
import { RestrictionService } from 'src/app/services/restriction.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-ajout-enfant',
  templateUrl: './ajout-enfant.component.html',
  styleUrls: ['./ajout-enfant.component.css'],
})
export class AjoutEnfantComponent {
  restrictionsTab!: Restriction[];
  // enfant!: Enfant;
  enfant: Enfant = {
    prenom: '',
    date_naissance: new Date(),
    id_utilisateur: 1,
    restrictions: [],
  };

  // testRestrictions = [
  //   { id: 1, libelle: 'ouou' },
  //   { id: 2, libelle: 'ouou' },
  //   { id: 3, libelle: 'ouou' },
  // ];

  checkedRestrictions: Restriction[] = [];

  constructor(
    private router : Router,
    private utilisateurService: UtilisateurService,
    private restrictionService: RestrictionService // private enfantService: EnfantService
  ) {}

  ngOnInit(): void {
    this.restrictionService.getRestrictions().subscribe((data) => {
      this.restrictionsTab = data;
    });
    
  }

  onChangeRestric(e: Event) {
    const target = e.target as HTMLInputElement;
    const infoChecked = JSON.parse(target.value);
    if (target.checked) {

      if (this.checkedRestrictions.length === this.restrictionsTab.length) {
        this.checkedRestrictions = [];
        this.checkedRestrictions.push(infoChecked);
      } else {
        this.checkedRestrictions.push(infoChecked);
      }
    } else {
      if (this.checkedRestrictions.includes(infoChecked)) {
        this.checkedRestrictions = this.checkedRestrictions.filter(
          (e) => e != infoChecked
        );
      } else {
        this.checkedRestrictions.push(infoChecked);
      }
    }
  }

  // Ajouter la restriction au tableau si on coche la checkbox
  // Enlever la restriction du tableau si on décoche la checkbox
  // Affiche le table de restriction cochées
  ajoutEnfant() {
    this.enfant.restrictions = this.checkedRestrictions;
    this.utilisateurService.addEnfantByUser(this.enfant).subscribe({
      next: (response) => {
       this.router.navigate([`/profil-utilisateur`])
      },
      error: (error) => {
      },
    });
  }
}
