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
      });
  }

  onChangeRestric(e: Event) {
    const target = e.target as HTMLInputElement;
    const infoChecked = JSON.parse(target.value);

    if (target.checked) {

      if (this.checkedRestrictions.length === this.restriction.length) {
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

    // Ajouter la restriction au tableau si on coche la checkbox
    // Enlever la restriction du tableau si on décoche la checkbox
    // Affiche le table de restriction cochées
  }

  ajoutEnfant() {
    // this.onChangeRestric;
    this.enfant.restrictions = this.checkedRestrictions;
    this.enfantService.updateEnfant(this.enfant).subscribe({
      next: (response) => {
        this.router.navigate([`/profil-utilisateur/child/${this.enfant.id}`]);
      },
      error: (error) => {},
    });
  }
}
