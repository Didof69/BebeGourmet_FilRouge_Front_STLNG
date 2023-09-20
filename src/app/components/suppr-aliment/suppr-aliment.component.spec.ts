import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprAlimentComponent } from './suppr-aliment.component';

describe('SupprAlimentComponent', () => {
  let component: SupprAlimentComponent;
  let fixture: ComponentFixture<SupprAlimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupprAlimentComponent]
    });
    fixture = TestBed.createComponent(SupprAlimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
