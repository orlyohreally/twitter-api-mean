import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';
import { TwitterChannel } from '../twitter-channel';
import { ChannelSubscription } from '../subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private subscriptionService: SubscriptionService) {}
  private subscriptions: ChannelSubscription[];
  isLoading = true;

  ngOnInit() {
    this.getSubscriptions().then(() => {
      if (this.subscriptions.length) {
        this.displayTimelines();
      }
    });
  }
  private displayTimelines() {
    if ((window as any).twttr.widgets === undefined) {
      setTimeout(() => {
        this.displayTimelines();
      }, 1000);
      console.log('undefined');
    } else {
      this.createTimelines();
    }
  }
  private createTimelines() {
    console.log('createTimelines', document.querySelector('#timeline-0'));
    if (document.querySelector('#timeline-0')) {
      console.log('creating timelines');
      this.subscriptions.map(this.createTimeline);
      this.isLoading = false;
    } else {
      console.log('no timeline', document.querySelector('#timeline-0'));
      setTimeout(() => {
        this.createTimelines();
      }, 1000);
    }
  }

  private getSubscriptions(): any {
    return this.subscriptionService
      .list()
      .toPromise()
      .then(
        subscriptions => {
          this.isLoading = false;
          this.subscriptions = subscriptions;
          console.log(this.subscriptions);
        },
        err => {
          console.log(err);
        }
      );
  }

  private createTimeline(subscription: ChannelSubscription, i) {
    console.log(i, `timeline-${i}`, document.getElementById(`timeline-${i}`));
    (window as any).twttr.widgets
      .createTimeline(
        {
          sourceType: 'profile',
          screenName: subscription.channel.screen_name
        },
        document.getElementById(`timeline-${i}`),
        {
          width: '300'
        }
      )
      .then(function(el) {
        console.log('Embedded a timeline.');
      });
  }
}
