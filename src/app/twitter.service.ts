import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TwitterChannel } from './twitter-channel';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<TwitterChannel[]> {
    return this.http.get<TwitterChannel[]>(`/search?=${query}`);
  }
}
