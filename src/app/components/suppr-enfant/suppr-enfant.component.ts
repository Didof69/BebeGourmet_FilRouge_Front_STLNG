import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enfant } from 'src/app/models/enfant';
import { EnfantService } from 'src/app/services/enfant.service';

@Component({
  selector: 'app-suppr-enfant',
  templateUrl: './suppr-enfant.component.html',
  styleUrls: ['./suppr-enfant.component.css'],
})
export class SupprEnfantComponent {
  enfant!: Enfant;

  constructor(
    private enfantService :EnfantService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //reoriente quand pas admine vers 404
    const routeParam = this.route.snapshot.paramMap;
    const enfantIdFromRoute = Number(routeParam.get('id'));

    this.enfantService
      .getProfilEnfant(enfantIdFromRoute)
      .subscribe((enfant) => {
        // console.log('infos récupéré', aliment);
        // ma requête http pour la récupe de l'ID
        this.enfant = enfant;
        // initialisation de la propriété de plant comme étant les données qu'on récupère de la BDD.
      });
  }

  deleteEnfant(enfant:Enfant) {
    this.enfantService.deleteEnfant(enfant).subscribe({
      next: (response) => {
        this.router.navigate([`/profil-utilisateur`]);
      },
      error: (error) => {
      },
    });  
  }
}
