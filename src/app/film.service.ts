import { Injectable, NgZone, inject } from '@angular/core';
import { collection, query, addDoc, onSnapshot, DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter, deleteDoc, doc, where, updateDoc } from "firebase/firestore";
import { DbService } from './db.service';
import { Observable, Subject, map, mergeMap } from 'rxjs';
import { Show } from './types/types';
import { TvmazeService } from './tvmaze.service';
import { FirebaseError } from 'firebase/app';

const showConverter: FirestoreDataConverter<Show> = {
  toFirestore(show: Show): DocumentData {
    return {
      id: show.id,
      title: show.title,
      mazeId: show.mazeId
    }
  },

  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Show {
    const data = snapshot.data()
    return {
      docId: snapshot.id,
      id: data['id'],
      title: data['title'],
      mazeId: data['mazeId']
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
  filmSubject = new Subject<Show[]>()
  film$ = this.filmSubject.asObservable()

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
          mazeId: `${next.id}`,
        }).catch(e => {
          if (e instanceof FirebaseError) {
            console.log(e.customData)
            console.log(e.message)
            throw e
          }
          console.log("error", e)
        })
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
    const q = query(collection(this.dbService.db, "table-show"))
      .withConverter(showConverter)

    const unsubscribe = onSnapshot(collection(this.dbService.db, "table-show"), snap => {
      const shows: Show[] = []
      snap.docs.forEach(doc => {
        shows.push(showConverter.fromFirestore(doc))
      })
      this.filmSubject.next(shows)
    }, error => {
      console.error("error", error)
      this.filmSubject.error(error)
    })
    return this.film$
  }


  async deleteShow(docId: string): Promise<boolean> {
    console.log(docId)
    return await deleteDoc(doc(this.dbService.db, "table-show", docId))
      .then(() => true)
      .catch(err => false)
  }

  updateShow(show: Show) {
    console.log("id of updated show", show.docId)
    return this.tvmaze.singleShowSearch(show.title).pipe(map(async next => {
      console.log(next)
      try {
        await updateDoc(doc(this.dbService.db, "table-show", show.docId ?? ""), showConverter.toFirestore(show))
        console.log('firebase could update document, returning true')
        return true
      } catch (e: any) {
        console.log('catched error while updateing in firebase')
        return false
      }
    }))
  }

}
