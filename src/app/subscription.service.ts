import { Injectable } from '@angular/core';
import { TwitterChannel } from './twitter-channel';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChannelSubscription } from './subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  list(): Observable<ChannelSubscription[]> {
    console.log('subscribeService: list');
    return this.http.get<ChannelSubscription[]>('/api/subscriptions/');
  }

  subscribe(channel: TwitterChannel): Observable<TwitterChannel[]> {
    console.log('subscribeService: subscribe', channel);
    return this.http.post<TwitterChannel[]>(
      '/api/subscriptions/create',
      channel
    );
  }

  unsubscribe(subscription: ChannelSubscription): any {
    console.log('subscribeService: subscribe', subscription);
    return this.http.delete(
      '/api/subscriptions/delete/' + subscription._id + '/'
    );
  }
}
