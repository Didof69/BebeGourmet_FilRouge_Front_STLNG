import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enfant } from 'src/app/models/enfant';
import { Restriction } from 'src/app/models/restriction';
import { EnfantService } from 'src/app/services/enfant.service';
import { RestrictionService } from 'src/app/services/restriction.service';

@Component({
  selector: 'app-modif-enfant',
  templateUrl: './modif-enfant.component.html',
  styleUrls: ['./modif-enfant.component.css'],
})
export class ModifEnfantComponent {
  restriction: Restriction[] = [];
  enfant!: Enfant;

  checkedRestrictions: Restriction[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enfantService: EnfantService,
    private restrictionService: RestrictionService // private enfantService: EnfantService
  ) {}

  ngOnInit(): void {
    this.restrictionService.getRestrictions().subscribe((data) => {
      this.restriction = data;
    });
    const routeParam = this.route.snapshot.paramMap;
    const enfantIdFromRoute = Number(routeParam.get('id'));

    this.enfantService
      .getProfilEnfant(enfantIdFromRoute)
      .subscribe((enfant) => {
        this.enfant = enfant;
        console.log(this.enfant);
      });
  }

  onChangeRestric(e: Event) {
    const target = e.target as HTMLInputElement;
    // console.log('je log mon target de la box', e.target);
    const infoChecked = JSON.parse(target.value);
    // console.log('value en json', infoChecked);
    if (target.checked) {
      // console.log('ce que je selectionne', infoChecked);

      if (this.checkedRestrictions.length === this.restriction.length) {
        this.checkedRestrictions = [];
        this.checkedRestrictions.push(infoChecked);
        // console.log(
        //   'je log mon tableau une fois vider (1er if)',
        //   this.checkedRestrictions
        // );
      } else {
        this.checkedRestrictions.push(infoChecked);
        // console.log(
        //   `else du if dans 1 , je push, ${infoChecked} dans le tableau, ${this.checkedRestrictions} `
        // );
        // console.log(this.checkedRestrictions);
      }
    } else {
      if (this.checkedRestrictions.includes(infoChecked)) {
        this.checkedRestrictions = this.checkedRestrictions.filter(
          (e) => e != infoChecked
        );
        // console.log('if dans else', infoChecked);
      } else {
        this.checkedRestrictions.push(infoChecked);
        // console.log('else dans else', infoChecked);
      }
    }
    // if (this.checkedRestrictions.length === 0) {
    //   this.checkedRestrictions = [...this.restriction];
    // console.log('last chose', infoChecked);
    // }

    // Ajouter la restriction au tableau si on coche la checkbox
    // Enlever la restriction du tableau si on décoche la checkbox
    // Affiche le table de restriction cochées

  }

  ajoutEnfant() {
    // this.onChangeRestric;
    this.enfant.restrictions = this.checkedRestrictions;
    this.enfantService.updateEnfant(this.enfant).subscribe({
      next: (response) => {
        console.log('Inscription réussie:', response);
        this.router.navigate([`/profil-utilisateur/child/${this.enfant.id}`]);
      },
      error: (error) => {
        console.log("Echec de l'ajout", error);
        // console.log('je recoie3', this.enfant);
      },
    });
    // console.log('je recoie4', this.enfant);
  }
}
