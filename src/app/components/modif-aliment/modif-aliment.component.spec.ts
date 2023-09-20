import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifAlimentComponent } from './modif-aliment.component';

describe('ModifAlimentComponent', () => {
  let component: ModifAlimentComponent;
  let fixture: ComponentFixture<ModifAlimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifAlimentComponent]
    });
    fixture = TestBed.createComponent(ModifAlimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
