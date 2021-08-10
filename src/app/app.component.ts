import {Component, OnInit, OnDestroy} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogLoginComponent} from "./dialog-login/dialog-login.component";

import {DataService} from "./app.service";
import {Subscription} from 'rxjs';
import {DialogLoginPocketComponent} from "./dialog-login-pocket/dialog-login-pocket.component";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {from} from 'rxjs'
import {Location} from "@angular/common";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription;
  openDialogLogin: boolean = false;
  animal: string | undefined;
  name: string | undefined;

  userPhoto: string | undefined;

  code: any;

  constructor(
    public dialog: MatDialog,
    private readonly dataService: DataService,
    private http: HttpClient,
    private location: Location,
    private activateRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.subs = this.dataService.photoUrl$.subscribe((value) => this.setPhotoUrl(value));

    this.activateRoute.queryParams.subscribe(params => {
      this.req = params.code;
    });
    const parameters = new URLSearchParams(window.location.search);
    if (parameters.get('code') != null) {
      this.code = parameters.get('code');
      const headers = new HttpHeaders();
      let body = {
        grant_type: 'authorization_code',
        code: parameters.get('code'),
        client_id: '611123ddcf708e9b6838133b',
        client_secret: 'b341602e-1268-4c7e-b210-70b795f027d9',
        redirect_uri: 'https://task-img-elinext.herokuapp.com'
      };
      headers.append('Access-Control-Allow-Origin', 'https://task-img-elinext.herokuapp.com/login')
      headers.append('Access-Control-Expose-Headers', 'ETag, Content-Type, Accept, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset')
      headers.append('Access-Control-Allow-Credentials', 'true')
      headers.delete('Content-Type');
      headers.append('Content-Type', 'application/json')
      this.http.post('https://raindrop.io/oauth/access_token', JSON.stringify(body),{headers}).subscribe((response) => {
        this.req = response;
        console.log('authorization_code', this.req)
      })
    }
    console.log(parameters.get('code'))
    console.log(this.req)
  }

  funcRep(){
    const headers = new HttpHeaders();
    let body = {
      grant_type: 'authorization_code',
      code: this.code,
      client_id: '611123ddcf708e9b6838133b',
      client_secret: 'b341602e-1268-4c7e-b210-70b795f027d9',
      redirect_uri: 'https://task-img-elinext.herokuapp.com'
    };
    headers.append('Access-Control-Allow-Origin', 'https://task-img-elinext.herokuapp.com/login')
    headers.append('Access-Control-Expose-Headers', 'ETag, Content-Type, Accept, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset')
    headers.append('Access-Control-Allow-Credentials', 'true')
    headers.delete('Content-Type');
    headers.append('Content-Type', 'application/json')
    // this.http.post('https://raindrop.io/oauth/access_token', JSON.stringify(body),{headers}).subscribe((response) => {
    //   this.req = response;
    //   console.log('authorization_code', this.req)
    // })
    let result = from( // wrap the fetch in a from if you need an rxjs Observable
      fetch(
        `https://raindrop.io/oauth/access_token`,
        {
          body: JSON.stringify(body),
          headers: {
            'Access-Control-Allow-Origin': 'https://task-img-elinext.herokuapp.com/login',
            'Access-Control-Expose-Headers': 'ETag, Content-Type, Accept, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors',
          redirect: "follow"
        }
      ).finally(() => {
        console.log(result)
      })
    );
    result.subscribe((resp) => {
      console.log(resp)
      this.req = resp;
    })



  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '350px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogPocket(): void {
    const dialogRef = this.dialog.open(DialogLoginPocketComponent, {
      width: '400px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  req: any;

  getCode() {
    // this.http.get(`https://raindrop.io/oauth/authorize?redirect_uri=localhost:4200&client_id=611123ddcf708e9b6838133b`).subscribe((data)=>{
    //   this.req = data;
    //   console.log(this.req);
    // })
    // let base = window.btoa('shpektras@gmai.com' + ':' + ',^wQ25!e7fNSUSH');
    // const headers = new HttpHeaders().set('Authorization', 'Basic ' + base);
    // // headers.set('Access-Control-Allow-Origin', '*')
    // // headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
    // let body = { username: "shpektras@gmai.com", password: ",^wQ25!e7fNSUSH"};

    let result = from( // wrap the fetch in a from if you need an rxjs Observable
      fetch(
        `https://raindrop.io/oauth/authorize?redirect_uri=https://task-img-elinext.herokuapp.com/login&client_id=611123ddcf708e9b6838133b`,
        {
          // body: JSON.stringify(body),
          headers: {
            'Content-Type': 'text',
          },
          method: 'GET',
          mode: 'no-cors',
          redirect: "follow"
        }
      ).finally(() => {
        console.log(result)
      })
    );
    result.subscribe((resp) => {
      console.log(resp)
      this.req = resp;
    })
    console.log(this.req)
    let url = "https://app.raindrop.io/account/login?redirect=https%3A%2F%2Fapi.raindrop.io%2Fv1%2Foauth%2Fauthorize%3Fclient_id%3D611123ddcf708e9b6838133b%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A4200"
    // window.open("https://app.raindrop.io/account/login?redirect=https%3A%2F%2Fapi.raindrop.io%2Fv1%2Foauth%2Fauthorize%3Fclient_id%3D611123ddcf708e9b6838133b%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A4200", "_blank");


    // this.http.get(`https://www.instapaper.com/api/authenticate`,  {headers}).subscribe((data)=>{
    //   this.req = data;
    //   console.log(this.req);
    // })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setPhotoUrl(data: string) {
    console.log(data)
    this.userPhoto = data;
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
