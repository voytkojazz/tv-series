import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MazeMultiShowResponse, MazeShowResponse, Show } from '../types/types';
import { debounceTime, switchMap } from 'rxjs';
import { TvmazeService } from '../tvmaze.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@Component({
  selector: 'app-add-film',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './add-film.component.html',
  styleUrl: './add-film.component.scss'
})
export class AddFilmComponent implements OnInit {

  @Output() addingFilm = new EventEmitter<Show>()

  filmForm!: FormGroup;
  tvMazeService = inject(TvmazeService);
  filmOptions: MazeMultiShowResponse[] = [];

  onSubmit() {
    const formValue = this.filmForm.value;

    this.addingFilm.emit({
      id: formValue.id ?? "",
      title: formValue.title ?? ""
    })
  }

  ngOnInit(): void {
    this.filmForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('')
    })

    this.filmForm.get('title')?.valueChanges.pipe(
      debounceTime(300), // wait 300ms after the last event before emitting last event
      switchMap(title => this.tvMazeService.showSearch(title as string) // cancel previous pending requests
      )).subscribe((data: MazeMultiShowResponse[]) => {
        console.log(data)
        this.filmOptions = data;
      });
  }

}
