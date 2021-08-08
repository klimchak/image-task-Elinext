import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
// import { MatGridListModule } from '@angular/material/grid-list';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CardblockComponent } from './cardblock/cardblock.component';
import { PaginationComponent } from './pagination/pagination.component';
import {MatInputModule} from "@angular/material/input";
import {SearchService} from "./search/search.service";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatChipsModule} from "@angular/material/chips";
import {FormsModule} from "@angular/forms";
import { BookmarkComponent } from './bookmark/bookmark.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SearchComponent,
    CardblockComponent,
    PaginationComponent,
    BookmarkComponent,
    DialogLoginComponent
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
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    MatDialogModule,
    MatDividerModule,
    // MatListModule,
    // MatGridListModule
  ],
  // providers: [SearchService],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'key'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
