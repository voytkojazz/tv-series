import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvmazeService {

  private readonly API_URL = 'https://api.tvmaze.com/'
  private client

  constructor(client: HttpClient) {
    this.client = client
  }

  singleShowSearch(query: string): Observable<Object> {
  
    const response$ = this.client.get(`${this.API_URL}singlesearch/shows`, {
      params: {q: query}
    })
    console.log(response$)
    return response$
  }

}
