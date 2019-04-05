import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.getTimelines();
  }
  private getTimelines() {
    this.subscriptionService.getTimelines().subscribe(
      timelines => {
        console.log(timelines);
      },
      err => {
        console.log(err);
      }
    );
  }
}
