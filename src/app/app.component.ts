import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FilmTableComponent } from './film-table/film-table.component';
import { FilmDetailsComponent } from './film-details/film-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FilmTableComponent, FilmDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss', 'film-details/film-details.component.scss']
})
export class AppComponent {
  title = 'tv-series';
 
}
