import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommencerComponent } from './pages/commencer/commencer.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AlimentComponent } from './pages/aliment/aliment.component';
import { UtilisateurComponent } from './pages/utilisateur/utilisateur.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { ProfilEnfantComponent } from './components/profil-enfant/profil-enfant.component';
import { AjoutEnfantComponent } from './components/ajout-enfant/ajout-enfant.component';
import { ModifEnfantComponent } from './components/modif-enfant/modif-enfant.component';
import { ModifAlimentComponent } from './components/modif-aliment/modif-aliment.component';
import { SupprAlimentComponent } from './components/suppr-aliment/suppr-aliment.component';
import { AjoutAlimentComponent } from './components/ajout-aliment/ajout-aliment.component';
import { SupprEnfantComponent } from './components/suppr-enfant/suppr-enfant.component';

const routes: Routes = [
  { path: '', component: CommencerComponent },
  { path: 'home', component: AccueilComponent },
  { path: 'aliment', component: AlimentComponent },
  { path: 'aliment/ajouter', component: AjoutAlimentComponent },
  { path: 'aliment/modifier/:id', component: ModifAlimentComponent },
  { path: 'aliment/supprimer/:id', component: SupprAlimentComponent },
  { path: 'profil-utilisateur', component: UtilisateurComponent },
  { path: 'profil-utilisateur/ok', component: UtilisateurComponent },
  { path: 'profil-utilisateur/inscription', component: InscriptionComponent },
  { path: 'profil-utilisateur/connexion', component: ConnexionComponent },
  { path: 'profil-utilisateur/child/add', component: AjoutEnfantComponent },
  {
    path: 'profil-utilisateur/child/supprimer/:id',
    component: SupprEnfantComponent,
  },
  {
    path: 'profil-utilisateur/child/modifier/:id',
    component: ModifEnfantComponent,
  },
  { path: 'profil-utilisateur/child/:id', component: ProfilEnfantComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
