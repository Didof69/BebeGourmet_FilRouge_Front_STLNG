import { Component, Input } from '@angular/core';
import { Aliment } from 'src/app/models/aliment';
import { Enfant } from 'src/app/models/enfant';

@Component({
  selector: 'app-liste-aliment',
  templateUrl: './liste-aliment.component.html',
  styleUrls: ['./liste-aliment.component.css'],
})
export class ListeAlimentComponent {
  @Input() enfant!: Enfant;
  @Input() aliments!: Aliment[];
  @Input() profilUtilisateur!: boolean;
}