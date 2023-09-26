import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommencerComponent } from './pages/commencer/commencer.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AlimentComponent } from './pages/aliment/aliment.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UtilisateurComponent } from './pages/utilisateur/utilisateur.component';
import { AjoutAlimentComponent } from './components/ajout-aliment/ajout-aliment.component';
import { AjoutEnfantComponent } from './components/ajout-enfant/ajout-enfant.component';
import { CardEnfantComponent } from './components/card-enfant/card-enfant.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ListeAlimentComponent } from './components/liste-aliment/liste-aliment.component';
import { ModifAlimentComponent } from './components/modif-aliment/modif-aliment.component';
import { ModifEnfantComponent } from './components/modif-enfant/modif-enfant.component';
import { ProfilEnfantComponent } from './components/profil-enfant/profil-enfant.component';
import { ProfilUtilisateurComponent } from './components/profil-utilisateur/profil-utilisateur.component';
import { SupprAlimentComponent } from './components/suppr-aliment/suppr-aliment.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SupprEnfantComponent } from './components/suppr-enfant/suppr-enfant.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CommencerComponent,
    FooterComponent,
    AccueilComponent,
    AlimentComponent,
    NotFoundComponent,
    UtilisateurComponent,
    AjoutAlimentComponent,
    AjoutEnfantComponent,
    CardEnfantComponent,
    ConnexionComponent,
    InscriptionComponent,
    ListeAlimentComponent,
    ModifAlimentComponent,
    ModifEnfantComponent,
    ProfilEnfantComponent,
    ProfilUtilisateurComponent,
    SupprAlimentComponent,
    FilterBarComponent,
    SearchBarComponent,
    SupprEnfantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
