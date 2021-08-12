import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogLoginComponent} from "./dialog-login/dialog-login.component";
import {Subscription} from 'rxjs';
import {DialogLoginRaindropComponent} from "./dialog-login-raindrop/dialog-login-raindrop.component";
import {DataService} from "./app.service";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {apikeys} from "./app.apikey";
import {Router} from '@angular/router';
import {LocalStorageService} from "angular-web-storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription;
  loginToRaindrop: boolean = false;
  userPhotoRaindrop: string | undefined;
  name: string | undefined;
  userPhoto: string | undefined;
  title = 'ggg'
  code: any;
  req: any;
  private sub: any;

  constructor(
    public dialog: MatDialog,
    private readonly dataService: DataService,
    private httpClient: HttpClient,
    private httpBackend: HttpBackend,
    private router: Router,
    private local: LocalStorageService
  ) {
  }

  ngOnInit() {
    console.log('this.router.url', this.router.config[0].path)
    if (this.router.config[0].path == 'login') {
      this.code = new URL(window.location.toString()).searchParams.getAll('code')[0];
      let body = {
        grant_type: apikeys.raindropApi.grant_type,
        code: this.code,
        client_id: apikeys.raindropApi.client_id,
        client_secret: apikeys.raindropApi.client_secret,
        redirect_uri: apikeys.raindropApi.redirect_uri
      }
      console.log('body', body)
      let httpWithoutInterceptor = new HttpClient(this.httpBackend);
      httpWithoutInterceptor.post('https://task-img-elinext.herokuapp.com/access_token', JSON.stringify(body), {
        headers: {
          'content-type': 'application/json; charset=utf-8'
        }
      }).subscribe((response) => {
        this.req = response;
        this.local.set('access_token', this.req.access_token);
        this.local.set('refresh_token', this.req.refresh_token);
        this.local.set('token_type', this.req.token_type);
        console.log('bookmarksbookmarks', response)
      });
    }


    // this.dataService.loginToRaindrop$.subscribe((value) => {
    //   this.loginToRaindrop = value;
    // });
    // this.dataService.photoUrl$.subscribe((value) => {
    //   this.userPhoto = value;
    // });
    // this.dataService.photoUrlRaindrop$.subscribe((value) => {
    //   this.userPhotoRaindrop = value;
    // });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogRaindrop(): void {
    const dialogRef = this.dialog.open(DialogLoginRaindropComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  // логика на странице
  containerSearch: boolean = true;
  containerBookmark: boolean = false;

  setScreenSearch() {
    this.containerSearch = true;
    this.containerBookmark = false;
  }

  setScreenBookmark() {
    this.containerSearch = false;
    this.containerBookmark = true;
  }
}
