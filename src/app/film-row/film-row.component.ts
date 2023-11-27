import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Show } from '../types/types';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-row.component.html',
  styleUrl: './film-row.component.scss'
})
export class FilmRowComponent {
  @Input({required: true, transform: toFilm}) film = {id: '', title: ''}

  filmService

  constructor(filmService: FilmService) {
    this.filmService = filmService
  }

  async deleteShow(id: string) {
    console.log("trying to delete")
    await this.filmService.deleteShow(id)
  }

}

function toFilm(film: Show) {
  return film
}