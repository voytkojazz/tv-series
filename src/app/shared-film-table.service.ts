import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedFilmTableService {

    @Output() unselectRow = new EventEmitter<boolean>()

    constructor() { }

    closeDetails() {
        console.log('closing details')
        this.unselectRow.emit(true)
    }
    
}
