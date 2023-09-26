import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aliment } from 'src/app/models/aliment';
import { AlimentService } from 'src/app/services/aliment.service';

@Component({
  selector: 'app-suppr-aliment',
  templateUrl: './suppr-aliment.component.html',
  styleUrls: ['./suppr-aliment.component.css'],
})
export class SupprAlimentComponent {
  aliment!: Aliment;

  constructor(
    private alimentService: AlimentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //reoriente quand pas admine vers 404
    if (localStorage.getItem('profilUtilisateur') != 'true') {
      this.router.navigate(['/**']);
    }

    const routeParam = this.route.snapshot.paramMap;
    const alimentIdFromRoute = Number(routeParam.get('id'));

    this.alimentService
      .getAlimentById(alimentIdFromRoute)
      .subscribe((aliment) => {
        // console.log('infos récupéré', aliment);
        // ma requête http pour la récupe de l'ID
        this.aliment = aliment;
        // initialisation de la propriété de plant comme étant les données qu'on récupère de la BDD.
      });
  }

  deleteAliment(aliment: Aliment) {
    // console.log('id plante à supprimer :', aliment);
    this.alimentService.deleteAliment(aliment).subscribe({
      next: (response) => {
        this.router.navigate([`/aliment`]);
      },
      error: (error) => {
      },
    });
  }
}
