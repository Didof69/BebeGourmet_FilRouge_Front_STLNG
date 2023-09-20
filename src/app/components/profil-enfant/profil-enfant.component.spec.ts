import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilEnfantComponent } from './profil-enfant.component';

describe('ProfilEnfantComponent', () => {
  let component: ProfilEnfantComponent;
  let fixture: ComponentFixture<ProfilEnfantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilEnfantComponent]
    });
    fixture = TestBed.createComponent(ProfilEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
