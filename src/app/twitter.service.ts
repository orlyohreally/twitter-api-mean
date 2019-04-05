import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TwitterChannel } from './twitter-channel';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<TwitterChannel[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<TwitterChannel[]>('/api/users/search', { params });
  }

  public getAvatarStyle(channel: TwitterChannel) {
    return {
      'background-image': `url(${channel.profile_image_url_https})`
    };
  }
}
