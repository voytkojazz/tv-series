import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmService } from '../film.service';
import { AddFilmComponent } from '../add-film/add-film.component';
import { Show } from '../types/types';
import { FilmRowComponent } from '../film-row/film-row.component';

@Component({
  selector: 'app-film-table',
  standalone: true,
  imports: [CommonModule, AddFilmComponent, FilmRowComponent],
  templateUrl: './film-table.component.html',
  styleUrl: './film-table.component.scss'
})
export class FilmTableComponent implements OnInit {

  filmService
  films: Show[] = []
  
  constructor(filmService: FilmService) {
    this.filmService = filmService
  }

  ngOnInit(): void {
    this.filmService.getShows().subscribe(next => {
      console.log('recieved from observable', next)
      this.films = next
    })
  }

  addFilm(film: any) {
    this.filmService.addShow(film.id, film.title)
  }

  async deleteShow(id: string) {
    const result = await this.filmService.deleteShow(id)
    console.log(result)
  }

  get shows() {
    return this.films
  }

}
