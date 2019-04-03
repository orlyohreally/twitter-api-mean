import { Component, OnInit } from '@angular/core';
import { TwitterChannel } from '../twitter-channel';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SearchChannelDialogComponent } from '../search-channel-dialog/search-channel-dialog.component';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}
  subscriptions: TwitterChannel[];

  ngOnInit() {
    this.subscriptions = [
      {
        id_str: '12232',
        name: 'orly knop',
        screen_name: 'orlyohreally',
        description: 'description',
        followers_count: 100,
        profile_image_url:
          'https://pbs.twimg.com/profile_images/3712677050/4edec2f01fb9bb628b00a4e29cf278a2_bigger.jpeg',
        profile_image_url_https:
          'https://pbs.twimg.com/profile_images/3712677050/4edec2f01fb9bb628b00a4e29cf278a2_bigger.jpeg'
      },
      {
        id_str: '12232',
        name: 'orly knop',
        screen_name: 'orlyohreally',
        description: 'description',
        followers_count: 100,
        profile_image_url:
          'https://pbs.twimg.com/profile_images/3712677050/4edec2f01fb9bb628b00a4e29cf278a2_bigger.jpeg',
        profile_image_url_https:
          'https://pbs.twimg.com/profile_images/3712677050/4edec2f01fb9bb628b00a4e29cf278a2_bigger.jpeg'
      }
    ];
  }

  public getAvatarStyle(channel: TwitterChannel) {
    return {
      'background-image': `url(${channel.profile_image_url_https})`
    };
  }

  public searchChannel() {
    const dialogRef = this.dialog.open(SearchChannelDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  public follow(channel) {
    this.snackBar.open(
      `Started following channel ${channel.name}@ ${channel.screen_name}`,
      null,
      {
        duration: 2000
      }
    );
  }
}
