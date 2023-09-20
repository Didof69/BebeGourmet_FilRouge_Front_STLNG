import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifEnfantComponent } from './modif-enfant.component';

describe('ModifEnfantComponent', () => {
  let component: ModifEnfantComponent;
  let fixture: ComponentFixture<ModifEnfantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifEnfantComponent]
    });
    fixture = TestBed.createComponent(ModifEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
