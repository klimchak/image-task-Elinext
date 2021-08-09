import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../app.service";
import {DialogData} from "../dialog-login/dialog-login.component";
import {apikeys} from "../app.apikey";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-dialog-login-pocket',
  templateUrl: './dialog-login-pocket.component.html',
  styleUrls: ['./dialog-login-pocket.component.css']
})
export class DialogLoginPocketComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;
  consumer_key = apikeys.pocket;
  redUri = apikeys.redirectUri;
  req: any;

  onNoClick(): void {
    this.dialogRef.close();
  }

  // вход в гугл
  loginForm: FormGroup | any;
  isLoggedin: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogLoginPocketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly dataService: DataService,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {

  }

  loginWithPocket(event: any): void {
    event.preventDefault();
    const headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Origin', 'http://localhost:4200/api')
    const body = {
      redirect_uri: 'http://localhost:4200',
      client_id: '611123ddcf708e9b6838133b'
    };
    this.http.post<any>('https://raindrop.io/oauth/authorize', body).subscribe(data => {
      this.req = data;
      console.log(this.req)
    // this.http.get('https://raindrop.io/oauth/authorize', {
    //   params:{
    //     redirect_uri: 'http://localhost:4200/api',
    //     client_id: '611123ddcf708e9b6838133b'
    //   }, headers
    // }).subscribe(data => {
    //   this.req = data;
    //   console.log(this.req)

      // this.http.get<any>('https://getpocket.com/auth/authorize', {
      //   params: {
      //     request_token: this.req.code,
      //     redirect_uri: this.redUri + '/loginpocket'
      //   },
      // }).subscribe(data => {
      //   console.log(data)
      // })
    })
  }

  logOut(): void {

    this.dataService.changePhotoUrl(null);
  }

  // таймер
  timeLeft: number = 60;
  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.pauseTimer();
        this.timeLeft = 60;
        // this.logOut();
        console.log("Hidden");
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.timeLeft = 60;
  }

  @HostListener('document:visibilitychange', ['$event'])
  beforeunloadHandler(event: any): void {
    if (document.hidden) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }

    console.log(event)
  }


}
