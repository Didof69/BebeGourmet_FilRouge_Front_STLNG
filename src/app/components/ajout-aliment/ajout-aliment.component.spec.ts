import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAlimentComponent } from './ajout-aliment.component';

describe('AjoutAlimentComponent', () => {
  let component: AjoutAlimentComponent;
  let fixture: ComponentFixture<AjoutAlimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutAlimentComponent]
    });
    fixture = TestBed.createComponent(AjoutAlimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
