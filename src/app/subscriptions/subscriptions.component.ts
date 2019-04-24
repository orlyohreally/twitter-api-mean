import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SearchChannelDialogComponent } from '../search-channel-dialog/search-channel-dialog.component';
import { TwitterService } from '../twitter.service';
import { SubscriptionService } from '../subscription.service';
import { ChannelSubscription } from '../subscription';
import { TwitterChannel } from '../twitter-channel';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private twitterService: TwitterService,
    private subscriptionService: SubscriptionService
  ) {}
  subscriptions: ChannelSubscription[];

  ngOnInit() {
    this.getSubscriptions();
  }

  public getAvatarStyle(channel: TwitterChannel) {
    return this.twitterService.getAvatarStyle(channel);
  }

  private getSubscriptions() {
    this.subscriptionService.list().subscribe(
      subscriptions => {
        console.log(subscriptions);
        this.subscriptions = subscriptions;
      },
      err => {
        console.log('error', err);
      }
    );
  }

  public searchChannel() {
    const dialogRef = this.dialog.open(SearchChannelDialogComponent, {
      width: '80%',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result && result.status === 'success') {
        this.snackBar.open(
          `Started following channel ${result.subscription.channel.name}@ ${
            result.subscription.channel.screen_name
          }`,
          null,
          {
            duration: 2000
          }
        );
        this.subscriptions.push(result.subscription);
      }
    });
  }
  public activate(subscription: ChannelSubscription) {
    this.snackBar.open(
      `Started following channel ${subscription.channel.name}@ ${
        subscription.channel.screen_name
      }`,
      null,
      {
        duration: 2000
      }
    );
  }

  public deactivate(subscription: ChannelSubscription) {
    this.snackBar.open(
      `Stopped following channel ${subscription.channel.name}@ ${
        subscription.channel.screen_name
      }`,
      null,
      {
        duration: 2000
      }
    );
  }

  public remove(i: number) {
    const subscription = this.subscriptions[i];
    this.subscriptionService.unsubscribe(subscription).subscribe(
      res => {
        this.snackBar.open(res.message, null, {
          duration: 2000
        });
        this.subscriptions.splice(i, 1);
      },
      err => {
        console.log('error', err);
      }
    );
  }
}
