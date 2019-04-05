import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor() {}
  navItems: any[];

  ngOnInit() {
    this.navItems = [
      { displayName: 'Dashboard', link: '' },
      { displayName: 'Subscriptions', link: 'subscriptions' }
    ];
  }
}
