import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {SearchComponent} from './search/search.component';
import {CardblockComponent} from './cardblock/cardblock.component';
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatChipsModule} from "@angular/material/chips";
import {FormsModule} from "@angular/forms";
import {BookmarkComponent} from './bookmark/bookmark.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {AngularWebStorageModule} from 'angular-web-storage';
import {MatPaginatorModule} from "@angular/material/paginator";
import {PageEvent} from '@angular/material/paginator';
import {DialogLoginRaindropComponent} from './dialog-login-raindrop/dialog-login-raindrop.component';
import {UserIdleModule} from "angular-user-idle";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CardblockComponent,
    BookmarkComponent,
    DialogLoginRaindropComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatChipsModule,
    FormsModule,
    MatDialogModule,
    MatDividerModule,
    FlexLayoutModule,
    AngularWebStorageModule,
    MatPaginatorModule,
    UserIdleModule.forRoot({idle: 60, timeout: 60, ping: 120})
  ],
  providers: [
    PageEvent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
