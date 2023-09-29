import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aliment } from 'src/app/models/aliment';
import { Categorie } from 'src/app/models/categorie';
import { Restriction } from 'src/app/models/restriction';
import { Saison } from 'src/app/models/saison';
import { AlimentService } from 'src/app/services/aliment.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { RestrictionService } from 'src/app/services/restriction.service';
import { SaisonService } from 'src/app/services/saison.service';

@Component({
  selector: 'app-ajout-aliment',
  templateUrl: './ajout-aliment.component.html',
  styleUrls: ['./ajout-aliment.component.css'],
})
export class AjoutAlimentComponent implements OnInit {
  aliment!: Aliment;
  saisons: Saison[] = [];
  selectedSaisons: Saison[] = [];
  restrictions: Restriction[] = [];
  selectedRestrictions: Restriction[] = [];
  categorie: Categorie[] = [];
  selectedCategorie: number[] = [];
  ages: Aliment[] = [];
  selectedAge: Aliment[] = [];
  // hidden et hidden 1 pour switch entre les div
  hidden: boolean = true;
  hidden1: boolean = false;
  // blockSelect pour verrouiller les inputs
  blockSelect: boolean = false;
  texteLargeEcran: string = "Merci d’enregistrer les informations suivantes:";
  texteEcranEtroit: string = "Merci d’enregistrer ces informations:";
  isLargeScreen: boolean = true;

  constructor(
    private alimentService: AlimentService,
    private saisonService: SaisonService,
    private restrictionsService: RestrictionService,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit() {
    //réoriente vers 404 si pas admin
    if (sessionStorage.getItem('profilUtilisateur') != 'true') {
      this.router.navigate(['/**']);
    }

    // Dans ngOnInit, récupérez les saisons depuis l'API en utilisant le SaisonService
    this.saisonService.getSaisons().subscribe((data) => {
      this.saisons = data;
    });
    this.restrictionsService.getRestrictions().subscribe((data) => {
      this.restrictions = data;
    });
    this.categorieService.getCategories().subscribe((data) => {
      this.categorie = data;
    });
    this.checkScreenSize();

  }

  createAliment(
    libelle: string,
    categoryId: number[],
    age_introduction: number,
    saisons: Saison[],
    restrictions: Restriction[]
  ) {
    let newAliment = {
      libelle: libelle,
      id_categorie: categoryId[0],
      age_introduction: age_introduction,
      saisons: saisons,
      restrictions: restrictions,
    };

    if (
      !libelle ||
      !this.selectedCategorie ||
      !age_introduction ||
      this.selectedSaisons.length === 0
    ) {
      alert(`Merci de renseigner les champs vides`);
    } else {
      this.alimentService.createAliment(newAliment).subscribe(
        () => { this.router.navigate([`/aliment`]); });
    }
  }

  // methode pour les switch de div et le verouillage
  changediv() {
    if (
      this.hidden === this.hidden &&
      this.hidden1 === this.hidden1 &&
      this.blockSelect === this.blockSelect
    ) {
      this.hidden = !this.hidden;
      this.hidden1 = !this.hidden1;
      this.blockSelect = !this.blockSelect;
    }
  }

  // Utilisez HostListener pour détecter les changements de taille d'écran
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  // Fonction pour vérifier la taille de l'écran
  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 768; // Définissez la largeur minimale de l'écran pour considérer comme "grand écran"
  }
}
