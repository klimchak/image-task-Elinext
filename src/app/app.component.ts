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
  title = 'ggg'
  code: string | undefined;
  req: any;
  accessData: any;
  collectionData: any;
  mapIdPhotos = new Map<string, string>();

  constructor(
    public dialog: MatDialog,
    private readonly dataService: DataService,
    private httpClient: HttpClient,
    private httpBackend: HttpBackend,
    private local: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.dataService.mapIdPhotos$.subscribe((value) => {
      this.mapIdPhotos = value;
    });
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
            console.log('this.local.get(\'collection_id\') == null', this.local.get('collection_id') == null);
            console.log('this.collectionData.item.length', this.collectionData.items.length);
            this.getIdCollection();
          });

        });
      }
    }
    if (this.local.get('access_token') != null) {
      this.loginToRaindrop = true;
      this.dataService.changePhotoUrlRaindrop("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTmr2GzVIC2tOD7CTwHBQyh0BpIBBBJpE2g&usqp=CAU");
      this.dataService.changeloginToRaindrop(true);
      this.dataService.loginToRaindrop = true;
      if (this.local.get('collection_id') == null) {
        this.dataService.getCollection().subscribe((response) => {
          this.collectionData = response;
          console.log('this.local.get(\'collection_id\') == null', this.local.get('collection_id') == null);
          console.log('this.collectionData.item.length', this.collectionData.items.length);
          this.getIdCollection();
        });
      }
    }
    if (this.local.get('access_token') == null) {
      this.loginToRaindrop = false;
      this.dataService.changePhotoUrlRaindrop(null);
      this.dataService.changeloginToRaindrop(false);
      this.dataService.loginToRaindrop = false;
    }
  }

  getIdCollection(): void {
    let devCollection = false;
    console.log('this.collectionData.items.length', this.collectionData.items.length)
    console.log('this.collectionData.items', this.collectionData.items)
    for (let i = 0; i < this.collectionData.items.length; i++) {
      console.log('this.collectionData.items[i].title', this.collectionData.items[i].title)
      if (this.collectionData.items[i].title === 'taskImageElinext') {
        this.local.set('collection_id', this.collectionData.items[i]._id);
        devCollection = true;
        break;
      }
    }
    if (!devCollection) {
      this.dataService.createCollection().subscribe((response) => {
        this.req = response;
        this.local.set('collection_id', this.req.item._id);
        console.log('createCollection', this.req);
        console.log('collection_id', this.local.get('collection_id'));
        window.location.href = "https://task-img-elinext.herokuapp.com/loginIsTrue";
      });
    }else {
      for (let i = 0; i < this.collectionData.items.length; i++){
        this.mapIdPhotos.set(this.collectionData.items[i].title, this.collectionData.items[i]._id)
      }
      window.location.href = "https://task-img-elinext.herokuapp.com/loginIsTrue";
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
