import {Component, EventEmitter, HostListener, Inject, OnInit, Output} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

import { DataService } from "../app.service";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent {

  onNoClick(): void {
    this.dialogRef.close();
  }

  // вход в гугл
  loginForm: FormGroup | any;
  socialUser: SocialUser | any;
  isLoggedin: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private socialAuthService: SocialAuthService,
              public dialogRef: MatDialogRef<DialogLoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private readonly dataService: DataService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      if (this.socialUser != null) {
        this.dataService.changePhotoUrl(this.socialUser.photoUrl);
      }
      console.log(this.socialUser);
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.dataService.changePhotoUrl(this.socialUser.photoUrl);
  }

  logOut(): void {
    this.socialAuthService.signOut();
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
        this.logOut();
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

  @HostListener('mouseleave', ['$event'])
  mouseleaveHandler(event: any): void {
    console.log(event)
  }

}
