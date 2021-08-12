import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public photoUrl$ = new Subject<any>();
  public photoUrlRaindrop$ = new Subject<any>();
  public loginToRaindrop$ = new Subject<any>();
  public photoUrl = '';
  public photoUrlRaindrop = '';
  public loginToRaindrop = false;

  public changePhotoUrl(photoUrl: any) {
    this.photoUrl$.next(photoUrl);
    this.photoUrl = photoUrl;
  }
  public changePhotoUrlRaindrop(photoUrl: any) {
    this.photoUrlRaindrop$.next(photoUrl);
    this.photoUrlRaindrop = photoUrl;
  }
  public changeloginToRaindrop(boolLogin: any) {
    this.loginToRaindrop$.next(boolLogin);
    this.loginToRaindrop = boolLogin;
  }
  public getLoginToRaindrop(){
    return this.loginToRaindrop;
  }
}
