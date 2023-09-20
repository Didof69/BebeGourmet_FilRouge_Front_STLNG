import { Component, Input } from '@angular/core';
import { Aliment } from 'src/app/models/aliment';

@Component({
  selector: 'app-liste-aliment',
  templateUrl: './liste-aliment.component.html',
  styleUrls: ['./liste-aliment.component.css'],
})
export class ListeAlimentComponent {
  @Input() aliments!: Aliment[];
  @Input() profilUtilisateur!: boolean;
}