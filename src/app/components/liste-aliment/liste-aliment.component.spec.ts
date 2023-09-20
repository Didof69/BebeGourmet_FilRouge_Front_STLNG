import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAlimentComponent } from './liste-aliment.component';

describe('ListeAlimentComponent', () => {
  let component: ListeAlimentComponent;
  let fixture: ComponentFixture<ListeAlimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeAlimentComponent]
    });
    fixture = TestBed.createComponent(ListeAlimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
