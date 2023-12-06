import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmService } from '../film.service';
import { AddFilmComponent } from '../add-film/add-film.component';
import { EditResult, Show, EditCancel } from '../types/types';
import { FilmRowComponent } from '../film-row/film-row.component';
import { ModalComponent } from '../modal/modal.component';
import { EditFilmFormComponent } from '../edit-film-form/edit-film-form.component';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: '[app-film-table]',
    standalone: true,
    imports: [CommonModule, AddFilmComponent, FilmRowComponent, ModalComponent, EditFilmFormComponent, RouterLink],
    templateUrl: './film-table.component.html',
    styleUrl: './film-table.component.scss'
})
export class FilmTableComponent implements OnInit {

    filmService
    films: Show[] = []
    feedbackOpen = signal(false)
    feedbackTitle: string = ''
    feedbackMessage: string = ''
    filmToEdit: Show | null = null
    router: Router

    constructor(filmService: FilmService, router: Router) {
        this.filmService = filmService
        this.router = router
    }

    ngOnInit(): void {
        this.filmService.getShows().subscribe(next => {
            console.log('recieved from observable', next)
            this.films = next
        })
    }

    async addFilm(film: any) {
        this.filmService.addShow(film.id, film.title)
            .subscribe({
                next: (next) => {
                    this.handleFilmUpdated(next)
                },
                error: (err) => {
                    this.feedbackOpen.set(true)
                    console.log('opening feedback')
                    this.feedbackTitle = 'Error'
                    this.feedbackMessage = 'Such a show is not known, not added!'
                }
            })
    }

    async deleteShow(id: string) {
        const result = await this.filmService.deleteShow(id)
        console.log(result)
    }

    editFilm(film: Show) {
        this.filmToEdit = film
    }

    handleFilmUpdated(result: EditResult) {
        console.log('received update show event result value! ', result);
        this.filmToEdit = null;
        if (result == null) return;
        this.updateFeedback(result);
        this.feedbackOpen.set(true);
    }

    private updateFeedback(result: EditResult) {
        if (result == true) {
            this.feedbackTitle = "Success!";
            this.feedbackMessage = "Successfully updated!";
        } else {
            this.feedbackTitle = "Failure!";
            this.feedbackMessage = "Could not update!";
        }
    }

    navigateToFilm(mazeId: string | undefined) {
        if (mazeId == undefined) return
        this.router.navigate(['/details', mazeId])
    }


    get shows() {
        return this.films
    }

}
