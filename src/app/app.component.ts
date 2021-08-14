import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogLoginComponent} from "./dialog-login/dialog-login.component";
import {Subscription} from 'rxjs';
import {DialogLoginRaindropComponent} from "./dialog-login-raindrop/dialog-login-raindrop.component";
import {DataService} from "./app.service";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {apikeys} from "./app.apikey";
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
  title = 'Image Finder'
  code: string | undefined;
  req: any;
  accessData: any;
  collectionData: any;
  mapIdPhotos = new Map<string, string>();
  containerSearch: boolean = true;
  containerBookmark: boolean = false;

  constructor(
    public dialog: MatDialog,
    private readonly dataService: DataService,
    private httpClient: HttpClient,
    private httpBackend: HttpBackend,
    private local: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.dataService.photoUrlRaindrop$.subscribe((value) => {
      this.userPhotoRaindrop = value;
    });
    this.dataService.loginToRaindrop$.subscribe((value) => {
      this.loginToRaindrop = value;
    });
    if (this.local.get('access_token') == null) {
      this.code = new URL(window.location.toString()).searchParams.getAll('code')[0];
      if (this.code != undefined) {
        this.dataService.getAccessToken(this.code).subscribe((response) => {
          this.accessData = response;
          this.local.set('access_token', this.accessData.access_token);
          this.local.set('refresh_token', this.accessData.refresh_token);
          this.local.set('token_type', this.accessData.token_type);
          this.dataService.getCollection().subscribe((response) => {
            this.collectionData = response;
            this.getIdCollection(true);
          });
        });
      }
    }
    if (this.local.get('access_token') != null) {
      this.loginToRaindrop = true;
      this.dataService.changePhotoUrlRaindrop("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTmr2GzVIC2tOD7CTwHBQyh0BpIBBBJpE2g&usqp=CAU");
      this.dataService.changeloginToRaindrop(true);
      this.dataService.loginToRaindrop = true;
      this.dataService.getCollection().subscribe((response) => {
        this.collectionData = response;
        this.getIdCollection(false);
      });
    }
    if (this.local.get('access_token') == null) {
      this.loginToRaindrop = false;
      this.local.remove('collection_id');
      this.local.remove('refresh_token');
      this.local.remove('token_type');
      this.dataService.changePhotoUrlRaindrop(null);
      this.dataService.changeloginToRaindrop(false);
      this.dataService.loginToRaindrop = false;
    }
  }

  getIdCollection(redirect: boolean): void {
    let devCollection = false;
    console.log('this.collectionData.items.length', this.collectionData.items)
    for (let i = 0; i < this.collectionData.items.length; i++) {
      if (this.collectionData.items[i].title == 'taskImageElinext') {
        this.local.set('collection_id', this.collectionData.items[i]._id);
        devCollection = true;
        break;
      }
    }
    if (!devCollection) {
      this.dataService.createCollection().subscribe((response) => {
        this.req = response;
        this.local.set('collection_id', this.req.item._id);
        window.location.href = "https://task-img-elinext.herokuapp.com/loginIsTrue";
      });
    } else {
      this.dataService.getBookmarksFromRaindrop().subscribe((response) => {
        this.req = response;
        for (let i = 0; i < this.req.items.length; i++) {
          this.dataService.mapIdPhotos$.set(this.req.items[i].title, this.req.items[i]._id)
        }
      });
      redirect ? window.location.href = "https://task-img-elinext.herokuapp.com/loginIsTrue" : null;
    }
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

  setScreenSearch() {
    this.containerSearch = true;
    this.containerBookmark = false;
  }

  setScreenBookmark() {
    this.containerSearch = false;
    this.containerBookmark = true;
  }
}
