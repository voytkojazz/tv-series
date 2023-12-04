import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFilmFormComponent } from './edit-film-form.component';

describe('EditFilmFormComponent', () => {
  let component: EditFilmFormComponent;
  let fixture: ComponentFixture<EditFilmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFilmFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFilmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
