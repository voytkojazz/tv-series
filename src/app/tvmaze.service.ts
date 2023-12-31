import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MazeMultiShowResponse, MazeShowResponse } from './types/types';

@Injectable({
  providedIn: 'root'
})
export class TvmazeService {

  private readonly API_URL = 'https://api.tvmaze.com/'
  private client

  constructor(client: HttpClient) {
    this.client = client
  }

  singleShowSearch(query: string): Observable<MazeShowResponse> {
    const response$ = this.client.get<MazeShowResponse>(`${this.API_URL}singlesearch/shows`, {
      params: {q: query}
    })
    return response$
  }

  showSearch(query: string): Observable<MazeMultiShowResponse[]> {
    const response$ = this.client.get<MazeMultiShowResponse[]>(`${this.API_URL}search/shows`, {
      params: {q: query}
    })
    return response$
  }

  getById(id: string): Observable<MazeShowResponse> {
    const response$ = this.client.get<MazeShowResponse>(`${this.API_URL}shows/${id}`)
    return response$
  }

}
