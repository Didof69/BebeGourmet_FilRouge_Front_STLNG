import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aliment } from 'src/app/models/aliment';
import { Enfant } from 'src/app/models/enfant';
import { AlimentService } from 'src/app/services/aliment.service';
import { EnfantService } from 'src/app/services/enfant.service';

@Component({
  selector: 'app-profil-enfant',
  templateUrl: './profil-enfant.component.html',
  styleUrls: ['./profil-enfant.component.css'],
})
export class ProfilEnfantComponent {
  enfant!: Enfant;
  ageEnfant: number = 0;

  alimentsToDisplay: Aliment[] = []; //tableau d'aliments reçu de l'api
  alimentsToDisplayRestriction: Aliment[] = []; //tableau excluant les aliment avec restriction
  alimentsToDisplayFilter: Aliment[] = []; //tableau que l'on filtre avec saveFilterTab

  //filtre des aliments à ne pas afficher
  tabRestrictions: string[] = [];

  //tableaux de filtres par propriété à afficher
  tabCategories: string[] = [];
  tabSaisons: string[] = [];

  //initialisation du tableau qui recapitule tous les filtres
  saveFilterTab = {
    categorie: ['a'],
    saisons: ['c'],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private enfantService: EnfantService,
    private alimentService: AlimentService
  ) {}

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap;
    const enfantIdFromRoute = Number(routeParam.get('id'));

    this.enfantService.getProfilEnfant(enfantIdFromRoute).subscribe({
      next: (response) => {
        // console.log('retour get enfant:', response);
        this.enfant = response;
        this.restrictionsTabPersonnalise();
        this.ageEnfant = this.calculerAgeEnMois(this.enfant.date_naissance);

        this.alimentService.getAliments().subscribe((aliments) => {
          this.alimentsToDisplay = aliments;
          this.extraireAlimentsInterdits();
          this.filtrerAge();
          this.trierTabFiltre(this.alimentsToDisplayFilter); //trier par odre alpha le tableau
          console.log('tab initial', this.alimentsToDisplayFilter);

          //initialise le tableau des catégories
          this.tabCategories = [
            ...new Set(
              this.alimentsToDisplay.map((aliment) => aliment.category.libelle)
            ),
          ];

          //initialise le tableau des saisons
          this.alimentsToDisplay.forEach((aliment) => {
            aliment.saisons.forEach((saison) => {
              // Vérifiez si la saison n'est pas déjà présente dans tabSaisons
              const saisonExisteDeja = this.tabSaisons.some(
                (s) => s === saison.libelle
              );

              if (!saisonExisteDeja) {
                this.tabSaisons.push(saison.libelle);
              }
            });
          });

          this.tabCategories.sort();
          this.tabSaisons.sort();
          // console.log('catéories :' + this.tabCategories);
          // console.log('tableau des saisons' + this.tabSaisons);

          //initialise les filtres à afficer grâce aux tableaux des filtres
          this.saveFilterTab = {
            categorie: this.tabCategories,
            saisons: this.tabSaisons,
          };
        });
      },
      error: (error) => {
        console.log('Echec get enfant', error);
      },
    });
  }

  //zone enfant
  calculerAgeEnMois(dateNaissance: Date): number {
    const today = new Date(); //récuperer la date actuelle
    const dateAnniv = new Date(dateNaissance); //représente date de naissance enfant

    let mois = (today.getFullYear() - dateAnniv.getFullYear()) * 12;
    //ex: 2023-2022 = 1 => 1*12 = 12 mois
    mois += today.getMonth() - dateAnniv.getMonth();
    //ajoute cette difference de mois au total déjà calculé pour les années
    //les mois sont indexé à partir de 0, soit ex : septembre = 8

    if (today.getDate() < dateAnniv.getDate()) {
      mois--;
    }
    this.ageEnfant = mois
    return mois;
  }

  modifierEnfant() {
    this.router.navigate([`profil-utilisateur/child/modifier/${this.enfant.id}`]);
  }

  restrictionsTabPersonnalise() {
    this.enfant.restrictions.forEach((restriction) => {
      // Vérifiez si la restriction n'est pas déjà présente dans tabRestrictions
      const restrictionExisteDeja = this.tabRestrictions.some(
        (r) => r === restriction.libelle
      );

      if (!restrictionExisteDeja) {
        this.tabRestrictions.push(restriction.libelle);
      }
    });
    this.tabRestrictions.sort();
    console.log('tableau des restrictions perso' + this.tabRestrictions);
  }

  majusculeFirst() {
    const prenom =
      this.enfant.prenom.charAt(0).toUpperCase() + this.enfant.prenom.slice(1);
    return prenom;
  }

  //filtre le tableau à afficher selon l'age
  filtrerAge() {
    let alimentsToDisplayAge: Aliment[] = [];
    for (let i = 0; i < this.alimentsToDisplayFilter.length; i++) {
      if (this.alimentsToDisplayFilter[i].age_introduction <= this.ageEnfant) {
        alimentsToDisplayAge.push(this.alimentsToDisplayFilter[i]);
      }
    }
    this.alimentsToDisplayFilter = alimentsToDisplayAge;
  }

  //zone aliment
  //recupère les données reçues de la filterBar pour implémenter les tabFilter
  onFiltreCategorie(filtreCategorie: string[]) {
    this.saveFilterTab.categorie = [...filtreCategorie];
    this.extraireAlimentsInterdits();
    this.saveFilter(this.saveFilterTab);
    this.filtrerAge();
  }

  onFiltreSaisons(filtreSaison: string[]) {
    this.saveFilterTab.saisons = filtreSaison;
    this.extraireAlimentsInterdits();
    this.saveFilter(this.saveFilterTab);
    this.filtrerAge();
  }

  //cette methode permet d'iterer sur un aliment et de renvoyer un boolean nécessaire pour que le .include fasse le taf dans extraireAlimentsInterdits()
  filtreRestriction(e: Aliment): boolean {
    for (let i = 0; i < e.restrictions.length; i++) {
      // console.log("coucou c'est moi", e.restrictions[i].libelle);
      if (this.tabRestrictions.includes(e.restrictions[i].libelle)) {
        return true;
      }
    }
    return false;
  }

  //cette methode permet d'iterer sur un aliment et de renvoyer un boolean nécessaire pour que le .include fasse le taf dans saveFilter()
  filtreSaison(e: Aliment): boolean {
    for (let i = 0; i < e.saisons.length; i++) {
      if (this.saveFilterTab.saisons.includes(e.saisons[i].libelle)) {
        return true;
      }
    }
    return false;
  }

  //extrait les aliments ayant les restrictions de tabRestriction
  extraireAlimentsInterdits() {
    this.alimentsToDisplayRestriction = this.alimentsToDisplay
      .filter((e) => !this.filtreRestriction(e))
      .sort();
    this.alimentsToDisplayFilter = this.alimentsToDisplayRestriction;
    console.log('tab restriction', this.alimentsToDisplayFilter);
  }

  //sauvegarde des filtres à afficher
  //  rechercher le bon typage
  saveFilter(saveFilter: any) {
    // console.log(this.alimentsToDisplayRestriction);
    if (
      this.saveFilterTab.categorie.length >= 1 ||
      this.saveFilterTab.saisons.length >= 1
    ) {
      this.alimentsToDisplayFilter = this.alimentsToDisplayRestriction
        .filter((e) =>
          this.saveFilterTab.categorie.includes(e.category.libelle)
        )
        .filter((e) => this.filtreSaison(e));
    }
    this.trierTabFiltre(this.alimentsToDisplayFilter);
  }

  //permet de trier par ordre alpha un tableau d'aliments grâce au libellé
  trierTabFiltre(tab: Aliment[]) {
    tab.sort((a, b) => {
      const libelleA = a.libelle.toLowerCase();
      const libelleB = b.libelle.toLowerCase();

      if (libelleA < libelleB) {
        return -1;
      } else if (libelleA > libelleB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
