import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Enfant } from 'src/app/models/enfant';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  @Input() enfant!: Enfant;
  @Input() tabCategories!: Array<string>;
  @Input() tabAges!: Array<number>;
  @Input() tabRestrictions!: Array<string>;
  @Input() tabSaisons!: Array<string>;
  @Output() newCaterogieEvent = new EventEmitter<string[]>();
  @Output() newAgeEvent = new EventEmitter<number[]>();
  @Output() newRestrictionEvent = new EventEmitter<string[]>();
  @Output() newSaisonEvent = new EventEmitter<string[]>();

  // mise en place du mouvement de la filter-bar
  isFilterbarOpen = false;
  toggleFilterbar() {
    this.isFilterbarOpen = !this.isFilterbarOpen;
  }
  //

  categorieFiltre: string[] = [];
  ageFiltre: number[] = [];
  restrictionFiltre: string[] = [];
  saisonFiltre: string[] = [];

  onCheckCategorie(e: Event) {
    //recupérer la valeur de la checkbox et son etat
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      if (this.categorieFiltre.length === this.tabCategories.length) {
        this.categorieFiltre = [];
        this.categorieFiltre.push(target.value);
      } else {
        this.categorieFiltre.push(target.value);
      }
    } else {
      if (this.categorieFiltre.includes(target.value)) {
        this.categorieFiltre = this.categorieFiltre.filter(
          (e) => e != target.value
        );
      } else {
        this.categorieFiltre.push(target.value);
      }
    }

    if (this.categorieFiltre.length === 0) {
      this.categorieFiltre = [...this.tabCategories];
    }

    this.newCaterogieEvent.emit(this.categorieFiltre);
  }

  onCheckAge(e: Event) {
    // recupérer la valeur de la checkbox et son etat
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      if (this.ageFiltre.length === this.tabAges.length) {
        this.ageFiltre = [];
        this.ageFiltre.push(parseInt(target.value));
      } else {
        this.ageFiltre.push(parseInt(target.value));
      }
    } else {
      if (this.ageFiltre.includes(parseInt(target.value))) {
        this.ageFiltre = this.ageFiltre.filter(
          (e) => e != parseInt(target.value)
        );
      } else {
        this.ageFiltre.push(parseInt(target.value));
      }
    }

    if (this.ageFiltre.length === 0) {
      this.ageFiltre = [...this.tabAges.sort()];
    }

    this.newAgeEvent.emit(this.ageFiltre);
  }

  onCheckRestriction(e: Event) {
    //recupérer la valeur de la checkbox et son etat
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      if (this.restrictionFiltre.length === this.tabRestrictions.length) {
        this.restrictionFiltre = [];
        this.restrictionFiltre.push(target.value);
      } else {
        this.restrictionFiltre.push(target.value);
      }
    } else {
      if (this.restrictionFiltre.includes(target.value)) {
        this.restrictionFiltre = this.restrictionFiltre.filter(
          (e) => e != target.value
        );
      } else {
        this.restrictionFiltre.push(target.value);
      }
    }

    if (this.restrictionFiltre.length === 0) {
      this.restrictionFiltre = [];
    }
    this.newRestrictionEvent.emit(this.restrictionFiltre);
  }

  onCheckSaison(e: Event) {
    //recupérer la valeur de la checkbox et son etat
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      if (this.saisonFiltre.length === this.tabSaisons.length) {
        this.saisonFiltre = [];
        this.saisonFiltre.push(target.value);
      } else {
        this.saisonFiltre.push(target.value);
      }
    } else {
      if (this.saisonFiltre.includes(target.value)) {
        this.saisonFiltre = this.saisonFiltre.filter((e) => e != target.value);
      } else {
        this.saisonFiltre.push(target.value);
      }
    }

    if (this.saisonFiltre.length === 0) {
      this.saisonFiltre = [...this.tabSaisons];
    }

    this.newSaisonEvent.emit(this.saisonFiltre);
  }
}
