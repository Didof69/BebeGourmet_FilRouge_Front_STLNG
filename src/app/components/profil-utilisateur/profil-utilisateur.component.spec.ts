import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUtilisateurComponent } from './profil-utilisateur.component';

describe('ProfilUtilisateurComponent', () => {
  let component: ProfilUtilisateurComponent;
  let fixture: ComponentFixture<ProfilUtilisateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilUtilisateurComponent]
    });
    fixture = TestBed.createComponent(ProfilUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
