import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TwitterChannel } from '../twitter-channel';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TwitterService } from '../twitter.service';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'app-search',
  templateUrl: './search-channel-dialog.component.html',
  styleUrls: ['./search-channel-dialog.component.scss']
})
export class SearchChannelDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SearchChannelDialogComponent>,
    private twitterService: TwitterService,
    private subscriptionService: SubscriptionService
  ) {}
  search: any = { text: '' };
  isLoading = false;
  hasResult: boolean;
  channels: TwitterChannel[] = [];
  errorMessage: string;
  searchTextUpdate = new Subject<string>();
  ngOnInit() {
    this.searchTextUpdate
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.isLoading = true;
          this.getChannels(value);
        } else {
          this.onEmptySearch();
        }
      });
  }

  public onEmptySearch() {
    this.isLoading = false;
    this.errorMessage = '';
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public onTyping(event) {
    this.isLoading = true;
    this.searchTextUpdate.next(event);
  }

  public onClean() {
    this.search.text = '';
    this.onEmptySearch();
  }

  private getChannels(searchText) {
    console.log(searchText);

    this.twitterService.search(searchText).subscribe(
      channels => {
        this.channels = channels;
        this.errorMessage = '';
        this.isLoading = false;
        this.hasResult = channels.length > 0;
      },
      err => {
        console.log('error', err);
        this.isLoading = false;
        this.hasResult = false;
        this.errorMessage = 'Error!';
      }
    );
  }

  public subscribe(channel: TwitterChannel) {
    console.log('subscribe');
    this.subscriptionService.subscribe(channel).subscribe(
      subscription => {
        console.log(subscription);
        this.dialogRef.close({ status: 'success', subscription });
      },
      err => {
        console.log('error', err);
        this.dialogRef.close({ status: 'error', error: err });
        this.errorMessage = err.message;
      }
    );
  }

  public getAvatarStyle(channel: TwitterChannel) {
    return this.twitterService.getAvatarStyle(channel);
  }
}
