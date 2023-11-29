import { Injectable, NgZone, inject } from '@angular/core';
import { collection, query, addDoc, onSnapshot, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter, deleteDoc, doc, where } from "firebase/firestore";
import { DbService } from './db.service';
import { Observable } from 'rxjs';
import { Show } from './types/types';
import { error } from 'console';
import { TvmazeService } from './tvmaze.service';

const showConverter: FirestoreDataConverter<Show> = {
  toFirestore(show: Show): DocumentData {
    return {
      id: show.id,
      title: show.title
    }
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Show {
    const data = snapshot.data()
    return {
      docId: snapshot.id,
      id: data['id'],
      title: data['title']
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  dbService
  tvmaze
  ngZone = inject(NgZone)

  constructor(dbService: DbService, tvmaze: TvmazeService) {
    this.dbService = dbService
    this.tvmaze = tvmaze
  }

  async addShow(id: string, title: string) {
    const tvmazeResponse$ = this.tvmaze.singleShowSearch(title)
    tvmazeResponse$.subscribe({
      next: async (next) => {
        console.log(next)
        const docRef = await addDoc(collection(this.dbService.db, "table-show"), {
          id: id,
          title: title,
          mazeId: next.id
        }).catch(e => console.log("error", e))
        console.log(docRef)
      },
      error: (err) => {
        console.log('cathed error', err)
      }
    })
    return tvmazeResponse$;
  }

  getShows() {
    const shows = this.ngZone.runTask(() => this._getShows())
    return shows
  }

  private _getShows(): Observable<Show[]> {
    console.log('trying to construct observable')

    const q = query(collection(this.dbService.db, "table-show"))
      .withConverter(showConverter)

    const show$ = new Observable<Show[]>(observer => {
      console.log('constructing observable')
      const unsubscribe = onSnapshot(collection(this.dbService.db, "table-show"), snap => {
        const shows: Show[] = []
        console.log('recieved snap')
        snap.docs.forEach(doc => {
          console.log('recieved doc')
          shows.push(showConverter.fromFirestore(doc))
        })
        observer.next(shows)
      }, error => {
        console.error("error", error)
        observer.error(error)
        return error
      })
      return unsubscribe
    })
    return show$
  }

  async deleteShow(docId: string): Promise<boolean> {
    console.log(docId)
    return await deleteDoc(doc(this.dbService.db, "table-show", docId))
      .then(() => true)
      .catch(err => false)
  }
}
