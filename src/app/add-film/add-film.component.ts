import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Show } from '../types/types';

@Component({
  selector: 'app-add-film',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-film.component.html',
  styleUrl: './add-film.component.scss'
})
export class AddFilmComponent {
  @Output() addingFilm = new EventEmitter<Show>()

  filmForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('')
  })

  onSubmit() {
    const formValue = this.filmForm.value;

    this.addingFilm.emit({
      id: formValue.id ?? "",
      title: formValue.title ?? ""
    })
  }

}
