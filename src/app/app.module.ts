import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatSnackBarModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatMenuModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { SearchChannelDialogComponent } from './search-channel-dialog/search-channel-dialog.component';
import { FormsModule } from '@angular/forms';
import { TwitterService } from './twitter.service';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SearchChannelDialogComponent,
    NavbarComponent,
    SubscriptionsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [TwitterService],
  entryComponents: [SearchChannelDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
