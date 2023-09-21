import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enfant } from 'src/app/models/enfant';
import { Utilisateur } from 'src/app/models/utilisateur';
import { EnfantService } from 'src/app/services/enfant.service';

@Component({
  selector: 'app-profil-enfant',
  templateUrl: './profil-enfant.component.html',
  styleUrls: ['./profil-enfant.component.css'],
})
export class ProfilEnfantComponent {
  enfant!: Enfant;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private enfantService: EnfantService
  ) {}

  ngOnInit(): void {
    const routeParam = this.route.snapshot.paramMap;
    const enfantIdFromRoute = Number(routeParam.get('id'));

    this.enfantService.getProfilEnfant(enfantIdFromRoute).subscribe({
      next: (response) => {
        console.log('retour get enfant:', response);
        this.enfant = response;
      },
      error: (error) => {
        console.log('Echec get enfant', error);
      },
    });
  }

  calculerAgeEnMois(): number {
    return 1;
  }

  modifierEnfant() {
    this.router.navigate([`profil-utilisateur/child/update/${this.enfant.id}`]);
  }

  restrictionsTab() {}

  majusculeFirst() {
    const prenom =
      this.enfant.prenom.charAt(0).toUpperCase() + this.enfant.prenom.slice(1);
    console.log('prenom ' + prenom);
    return prenom;
  }
}
