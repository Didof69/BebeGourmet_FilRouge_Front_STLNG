import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprEnfantComponent } from './suppr-enfant.component';

describe('SupprEnfantComponent', () => {
  let component: SupprEnfantComponent;
  let fixture: ComponentFixture<SupprEnfantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupprEnfantComponent]
    });
    fixture = TestBed.createComponent(SupprEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
