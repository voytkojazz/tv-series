import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FilmTableComponent } from './film-table/film-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FilmTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss', 'film-details/film-details.component.scss']
})
export class AppComponent {
  title = 'tv-series';
 
}
