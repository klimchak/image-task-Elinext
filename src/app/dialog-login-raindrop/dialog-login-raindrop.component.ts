import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../app.service";
import {apikeys} from "../app.apikey";
import {LocalStorageService} from "angular-web-storage";

@Component({
  selector: 'app-dialog-login-raindrop',
  templateUrl: './dialog-login-raindrop.component.html',
  styleUrls: ['./dialog-login-raindrop.component.css']
})
export class DialogLoginRaindropComponent implements OnInit {
  public loginToRaindrop = this.dataService.loginToRaindrop;
  userData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogLoginRaindropComponent>,
    private readonly dataService: DataService,
    private local: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.dataService.loginToRaindrop$.subscribe((value) => {
      this.loginToRaindrop = value;
    });
    if (this.local.get('access_token')) {
      this.dataService.getUserData().subscribe((response) => {
        this.userData = response;
      });
    }
  }

  pressLogin() {
    window.location.href = "https://raindrop.io/oauth/authorize?redirect_uri=" + apikeys.raindropApi.redirect_uri + "&client_id=" + apikeys.raindropApi.client_id;
  }

  pressLogout() {
    this.local.remove('access_token');
    this.local.remove('refresh_token');
    this.local.remove('token_type');
    this.local.remove('collection_id');
    this.loginToRaindrop = false;
    this.dataService.changePhotoUrlRaindrop(null);
    this.dataService.changeloginToRaindrop(false);
    this.dataService.loginToRaindrop = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
