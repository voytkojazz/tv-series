import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MazeShowResponse, Show } from '../types/types';
import { TvmazeService } from '../tvmaze.service';
import { Observable } from 'rxjs';

@Component({
  selector: '[app-film-details]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss', '../../styles.scss' ]
})
export class FilmDetailsComponent {

    id: string | null = null
    mazeService: TvmazeService
    show: Observable<MazeShowResponse> | null = null
    showDetails: MazeShowResponse | null = null
    router: Router

    constructor(route: ActivatedRoute, mazeService: TvmazeService, router: Router) {
        this.mazeService = mazeService
        this.router = router
        route.paramMap.subscribe(params => {
            this.id = params.get('id')
            this.loadFilm()
        })
    }

    loadFilm() {
        this.mazeService.getById(this.id ?? '')
            .subscribe({
                next: (next) => {
                    console.log('recieved show from maze', next)
                    this.showDetails = next
                }
            })
    }

    closeDetails() {
        console.log('closing details')
        this.router.navigate([''])
    }

}
