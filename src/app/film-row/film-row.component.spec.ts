import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmRowComponent } from './film-row.component';

describe('FilmRowComponent', () => {
  let component: FilmRowComponent;
  let fixture: ComponentFixture<FilmRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
