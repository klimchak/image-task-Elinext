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
import {ReactiveFormsModule} from '@angular/forms';
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import {DialogLoginComponent} from './dialog-login/dialog-login.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {AngularWebStorageModule} from 'angular-web-storage';
import {MatPaginatorModule} from "@angular/material/paginator";
import {PageEvent} from '@angular/material/paginator';
import {apikeys} from "./app.apikey";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AppInterceptorService} from "./app.interceptor.service";
import {DialogLoginRaindropComponent} from './dialog-login-raindrop/dialog-login-raindrop.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CardblockComponent,
    BookmarkComponent,
    DialogLoginComponent,
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
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    MatDialogModule,
    MatDividerModule,
    FlexLayoutModule,
    AngularWebStorageModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              apikeys.google
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    PageEvent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
