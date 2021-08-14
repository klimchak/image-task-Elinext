import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../app.service";
import {apikeys} from "../app.apikey";
import {LocalStorageService} from "angular-web-storage";
import {HttpClient, HttpBackend} from "@angular/common/http";

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
    private local: LocalStorageService,
    private httpBackend: HttpBackend
  ) {
  }

  ngOnInit() {
    this.dataService.loginToRaindrop$.subscribe((value) => {
      this.loginToRaindrop = value;
    });
    if (this.local.get('access_token')) {
      let httpWithoutInterceptor = new HttpClient(this.httpBackend);
      httpWithoutInterceptor.get('https://task-img-elinext.herokuapp.com/user', {
        headers: {
          // 'content-type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + this.local.get('access_token')
        }
      }).subscribe((response) => {
        this.userData = response;
        console.log('this.userData', this.userData)
      });
    }
  }

  pressLogin() {
    window.location.href = "https://raindrop.io/oauth/authorize?redirect_uri=https://task-img-elinext.herokuapp.com&client_id=" + apikeys.raindropApi.client_id;
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
