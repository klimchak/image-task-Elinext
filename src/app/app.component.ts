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
          this.dataService.getCollection().subscribe((response) =>{
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
        this.dataService.getCollection().subscribe((response) =>{
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

  getIdCollection(): void{
    if (this.collectionData.items.length == 0) {
      this.dataService.createCollection().subscribe((response) => {
        this.req = response;
        this.local.set('collection_id', this.req.item._id);
        console.log('collection_id', this.local.get('collection_id'));
        window.location.href = "https://task-img-elinext.herokuapp.com/loginIsTrue";
      })
    } else {
      let devCollection = false;
      for (let i = 0; i < this.collectionData.items; i++) {
        if (this.collectionData.items[i].title === 'task-image-elinext') {
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
      }
    }
    //
    //
    //
    //
    // let interimBool = false;
    // for (let i = 0; i < this.collectionData.items; i++) {
    //   console.log('this.req.items[i].title == \'task-image-elinext\'', this.collectionData.items[i].title, this.collectionData.items[i].title == 'task-image-elinext')
    //   if (this.collectionData.items[i].title == 'task-image-elinext') {
    //     this.local.set('collection_id', this.collectionData.items[i]._id);
    //     interimBool = true;
    //     break;
    //   }
    // }
    // return interimBool;
  }


  // getAccessToken(): void {
  //   let body = {
  //     grant_type: apikeys.raindropApi.grant_type,
  //     code: this.code,
  //     client_id: apikeys.raindropApi.client_id,
  //     client_secret: apikeys.raindropApi.client_secret,
  //     redirect_uri: apikeys.raindropApi.redirect_uri
  //   }
  //   let httpWithoutInterceptor = new HttpClient(this.httpBackend);
  //   httpWithoutInterceptor.post('https://task-img-elinext.herokuapp.com/access_token', JSON.stringify(body), {
  //     headers: {
  //       'content-type': 'application/json; charset=utf-8'
  //     }
  //   }).subscribe((response) => {
  //     this.req = response;
  //     this.local.set('access_token', this.req.access_token);
  //     this.local.set('refresh_token', this.req.refresh_token);
  //     this.local.set('token_type', this.req.token_type);
  //     this.req = this.getCollection();
  //     console.log('this.local.get(\'collection_id\') == null', this.local.get('collection_id') == null);
  //     console.log('this.req.item.length', this.local.get('collection_id') == null);
  //     if (this.req.item.length == 0) {
  //       this.createCollection(true)
  //     } else {
  //       let devCollection = false;
  //       for (let i = 0; i < this.req.items; i++) {
  //         console.log('this.req.items[i].title == \'task-image-elinext\'', this.req.items[i].title, this.req.items[i].title == 'task-image-elinext')
  //         if (this.req.items[i].title == 'task-image-elinext') {
  //           this.local.set('collection_id', this.req.items[i].title._id);
  //           devCollection = true;
  //           break;
  //         }
  //       }
  //       if (!devCollection) {
  //         this.createCollection(true)
  //       }
  //       window.location.href = "https://task-img-elinext.herokuapp.com/loginIsTrue"
  //     }
  //   });
  // }
  //
  // getCollection(): any {
  //   let httpWithoutInterceptor = new HttpClient(this.httpBackend);
  //   httpWithoutInterceptor.get('https://task-img-elinext.herokuapp.com/collections', {
  //     headers: {
  //       'Authorization': 'Bearer ' + this.local.get('access_token')
  //     }
  //   }).subscribe((response) => {
  //     let data: any = response;
  //     console.log('getCollection', response)
  //     return data;
  //   });
  // }
  //
  // createCollection(redirect: boolean) {
  //   let httpWithoutInterceptor = new HttpClient(this.httpBackend);
  //   let body = {
  //     title: 'task-image-elinext'
  //   }
  //   httpWithoutInterceptor.post('https://task-img-elinext.herokuapp.com/collection', JSON.stringify(body), {
  //     headers: {
  //       'Authorization': 'Bearer ' + this.local.get('access_token'),
  //       'content-type': 'application/json; charset=utf-8'
  //     }
  //   }).subscribe((response) => {
  //     this.req = response;
  //     this.local.set('collection_id', this.req.item.title._id);
  //     console.log('createCollection', this.req)
  //     console.log('collection_id', this.local.get('collection_id'))
  //     redirect ? window.location.href = "https://task-img-elinext.herokuapp.com/loginIsTrue" : null;
  //   });
  // }

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
