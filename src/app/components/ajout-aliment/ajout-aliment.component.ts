import { Component } from '@angular/core';
import { Aliment } from 'src/app/models/aliment';
import { Restriction } from 'src/app/models/restriction';
import { Saison } from 'src/app/models/saison';
import { AlimentService } from 'src/app/services/aliment.service';

@Component({
  selector: 'app-ajout-aliment',
  templateUrl: './ajout-aliment.component.html',
  styleUrls: ['./ajout-aliment.component.css'],
})
  
export class AjoutAlimentComponent {
  newAliment!: Aliment;

  constructor(private alimentService: AlimentService) {}

  createAliment(
    // libelle: string,
    // age_introduction: number,
    // id_categorie: number,
    // saisons: number[],
    // restrictions: number[]
    newAliment : Aliment
  ) {
    // let newAliment = {
    //   libelle: libelle,
    //   age_introduction: age_introduction,
    //   id_categorie: id_categorie,
    //   saisons: saisons,
    //   restrictions: restrictions,
    // };
    // if (!libelle || !id_categorie || !age_introduction || !saisons) {
    //   alert(`Merci de renseigner les champs vides`);
    // } else {
      this.alimentService.createAliment(newAliment).subscribe((data) => {
        if (data.id) {
          alert(`L'aliment id ${data.id} a été créée.`);
        }
      });
    }
  }

