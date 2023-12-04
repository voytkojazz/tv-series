import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Show } from '../types/types';
import { FilmService } from '../film.service';

@Component({
  selector: '[app-edit-film-form]',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-film-form.component.html',
  styleUrl: './edit-film-form.component.scss'
})
export class EditFilmFormComponent implements OnInit {

  ngOnInit(): void {
    this.id = new FormControl(this.film.id)
    this.title = new FormControl(this.film.title)
  }

  @Output() onFilmUpdated = new EventEmitter<boolean>()
  @Input() film: Show = { id: '', title: '', docId: '' }


  filmService = inject(FilmService)

  id = new FormControl(this.film.id)
  title = new FormControl(this.film.title)



  submitUpdate() {
    console.log(this.film)
    console.log("launching update from film ", { id: this.id, title: this.title })
    this.filmService.updateShow({ ...this.film, id: this.id.value ?? '', title: this.title.value ?? '' })
      .subscribe({
        next: (resultPromise) => {
          console.log('next appears in subsription')
          const result = resultPromise
            .then(() => this.onFilmUpdated.emit(true))
            .catch(() => {
              this.onFilmUpdated.emit(false)
            })
        },
        error: (err) => {
          this.onFilmUpdated.emit(false)
          console.log("catched error in observable")
        }
      })
  }

  cancelEdit() {
    this.onFilmUpdated.emit(false)
  }

}
