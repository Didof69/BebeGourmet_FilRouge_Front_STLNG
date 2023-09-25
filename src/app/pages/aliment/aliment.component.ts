import { Component } from '@angular/core';
import { Aliment } from 'src/app/models/aliment';
import { AlimentService } from 'src/app/services/aliment.service';

@Component({
  selector: 'app-aliment',
  templateUrl: './aliment.component.html',
  styleUrls: ['./aliment.component.css'],
})
export class AlimentComponent {
  //permer d'afficher la page en mode admin
  profilUtilisateur: boolean = false;

  alimentsToDisplay: Aliment[] = []; //tableau d'aliments reçu de l'api
  alimentsToDisplayRestriction: Aliment[] = []; //tableau excluant les aliment avec restriction
  alimentsToDisplayFilter: Aliment[] = []; //tableau que l'on filtre avec saveFilterTab

  //filtre des aliments à ne pas afficher
  tabRestrictions: string[] = [];
  //initialisation du tableau de sauvegarde des restrictions
  saveTabRestriction: string[] = [];

  //tableaux de filtres par propriété à afficher
  tabCategories: string[] = [];
  tabSaisons: string[] = [];
  tabAges: number[] = [];
  //initialisation du tableau qui recapitule tous les filtres
  saveFilterTab = {
    categorie: ['a'],
    age: [1],
    saisons: ['c'],
    valeur: '',
  };

  constructor(private alimentService: AlimentService) {}

  ngOnInit(): void {
    //verifie le statut admin
    if (localStorage.getItem('profilUtilisateur') == 'true') {
      this.profilUtilisateur = true;
    }

    this.alimentService.getAliments().subscribe((aliments) => {
      this.alimentsToDisplay = aliments;
      this.alimentsToDisplayFilter = [...this.alimentsToDisplay]; //permet d'initialiser le tableau à filtrer
      this.trierTabFiltre(this.alimentsToDisplayFilter);

      //initialise le tableau des catégories
      this.tabCategories = [
        ...new Set(
          this.alimentsToDisplay.map((aliment) => aliment.category.libelle)
        ),
      ];

      //initialise le tableau des ages
      this.tabAges = [
        ...new Set(
          this.alimentsToDisplay.map((aliment) => aliment.age_introduction)
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

      //initialise le tableau des restrictions
      this.alimentsToDisplay.forEach((aliment) => {
        aliment.restrictions.forEach((restriction) => {
          // Vérifiez si la restriction n'est pas déjà présente dans tabRestrictions
          const restrictionExisteDeja = this.tabRestrictions.some(
            (r) => r === restriction.libelle
          );

          if (!restrictionExisteDeja) {
            this.tabRestrictions.push(restriction.libelle);
          }
        });
      });

      this.tabRestrictions.sort();
      // console.log('tableau des restrictions' + this.tabRestrictions);

      this.tabAges.sort((a, b) => {
        return a - b;
      }); //tri par ordre croissant les chiffres
      this.tabCategories.sort();
      this.tabSaisons.sort();
      // console.log('catéories :' + this.tabCategories);
      // console.log('ages :' + this.tabAges);
      // console.log('tableau des saisons' + this.tabSaisons);

      //initialise les filtres à afficer grâce aux tableaux des filtres
      this.saveFilterTab = {
        categorie: this.tabCategories,
        age: this.tabAges,
        saisons: this.tabSaisons,
        valeur: '',
      };

      // console.log("dans oninit l'objet saveTabFilter est ", this.saveFilterTab);
    });
  }

  //recupère les données reçues de la filterBar pour implémenter les tabFilter
  onFiltreCategorie(filtreCategorie: string[]) {
    this.saveFilterTab.categorie = [...filtreCategorie];
    this.extraireAlimentsInterdits();
    this.saveFilter(this.saveFilterTab);
  }

  onFiltreAge(filtreAge: number[]) {
    this.saveFilterTab.age = [...filtreAge];
    this.extraireAlimentsInterdits();
    this.saveFilter(this.saveFilterTab);
  }

  onFiltreSaisons(filtreSaison: string[]) {
    this.saveFilterTab.saisons = [...filtreSaison];
    this.extraireAlimentsInterdits();
    this.saveFilter(this.saveFilterTab);
  }

  onSearchValue(value: string) {
    this.saveFilterTab.valeur = value;
    this.extraireAlimentsInterdits()
    this.saveFilter(this.saveFilterTab);
  }
  
  onFiltreRestrictions(filtreRestriction: string[]) {
    this.saveTabRestriction = [...filtreRestriction];
    // console.log('dans onFiltre' + this.saveTabRestriction);
    this.extraireAlimentsInterdits();
    this.onFiltreCategorie(this.saveFilterTab.categorie);
    this.onFiltreAge(this.saveFilterTab.age);
    this.onFiltreSaisons(this.saveFilterTab.saisons);
    this.onSearchValue(this.saveFilterTab.valeur);
  }

  //cette methode permet d'iterer sur un aliment et de renvoyer un boolean nécessaire pour que le .include fasse le taf dans extraireAlimentsInterdits()
  filtreRestriction(e: Aliment): boolean {
    // console.log("coucou c'est moi", e);
    for (let i = 0; i < e.restrictions.length; i++) {
      if (this.saveTabRestriction.includes(e.restrictions[i].libelle)) {
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
  }

  //sauvegarde des filtres à afficher
  //  rechercher le bon typage
  saveFilter(saveFilter: any) {
    // console.log(this.alimentsToDisplayRestriction);

    if (
      this.saveFilterTab.categorie.length >= 1 ||
      this.saveFilterTab.age.length >= 1 ||
      this.saveFilterTab.saisons.length >= 1 ||
      this.saveFilterTab.valeur.length >= 1
    ) {
      this.alimentsToDisplayFilter = this.alimentsToDisplayRestriction
        .filter((e) =>
          this.saveFilterTab.categorie.includes(e.category.libelle)
        )
        .filter((e) => this.saveFilterTab.age.includes(e.age_introduction))
        .filter((e) => this.filtreSaison(e))
        .filter((e) =>
          e.libelle
            .toLocaleLowerCase()
            .includes(this.saveFilterTab.valeur.toLocaleLowerCase())
        );
    }

    this.trierTabFiltre(this.alimentsToDisplayFilter);
    // console.log('le saveTabFilter à la sortie de saveFilter()',this.saveFilterTab);
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
