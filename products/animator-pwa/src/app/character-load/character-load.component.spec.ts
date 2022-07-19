import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLoadComponent } from './character-load.component';

describe('CharacterLoadComponent', () => {
  let component: CharacterLoadComponent;
  let fixture: ComponentFixture<CharacterLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
