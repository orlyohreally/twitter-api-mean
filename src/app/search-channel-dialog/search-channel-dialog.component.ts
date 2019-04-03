import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TwitterChannel } from '../twitter-channel';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TwitterService } from '../twitter.service';
@Component({
  selector: 'app-search',
  templateUrl: './search-channel-dialog.component.html',
  styleUrls: ['./search-channel-dialog.component.scss']
})
export class SearchChannelDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SearchChannelDialogComponent>,
    private twitterService: TwitterService
  ) {}
  search: any = { text: '' };
  channels: TwitterChannel[] = [];
  searchTextUpdate = new Subject<string>();
  ngOnInit() {
    this.searchTextUpdate
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.getChannels(value);
      });
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public onClean() {
    this.search.text = '';
  }

  getChannels(searchText) {
    console.log(searchText);

    this.twitterService.search(searchText).subscribe(
      channels => {
        this.channels = channels;
      },
      err => {
        console.log('error', err);
      }
    );
  }
}
