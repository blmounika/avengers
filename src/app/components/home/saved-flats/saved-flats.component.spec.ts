import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedFlatsComponent } from './saved-flats.component';

describe('SavedFlatsComponent', () => {
  let component: SavedFlatsComponent;
  let fixture: ComponentFixture<SavedFlatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedFlatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedFlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
