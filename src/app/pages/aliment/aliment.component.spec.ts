import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentComponent } from './aliment.component';

describe('AlimentComponent', () => {
  let component: AlimentComponent;
  let fixture: ComponentFixture<AlimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlimentComponent]
    });
    fixture = TestBed.createComponent(AlimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
