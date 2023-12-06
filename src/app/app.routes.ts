import { Routes } from '@angular/router';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmTableComponent } from './film-table/film-table.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'details/:id',
        component: FilmDetailsComponent
    }
];
