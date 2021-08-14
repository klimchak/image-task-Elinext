import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {apikeys} from "./app.apikey";
import {LocalStorageService} from "angular-web-storage";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private httpClient: HttpClient,
    private httpBackend: HttpBackend,
    private local: LocalStorageService
  ) {

  }
  private httpWithoutInterceptor = new HttpClient(this.httpBackend);

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

  public getAccessToken(code: string): Observable<any> {
    let body = {
      grant_type: apikeys.raindropApi.grant_type,
      code: code,
      client_id: apikeys.raindropApi.client_id,
      client_secret: apikeys.raindropApi.client_secret,
      redirect_uri: apikeys.raindropApi.redirect_uri
    }
    return this.httpWithoutInterceptor.post('https://task-img-elinext.herokuapp.com/access_token', JSON.stringify(body), {
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    });
  }

  public getCollection(): Observable<any> {
    return this.httpWithoutInterceptor.get('https://task-img-elinext.herokuapp.com/collections', {
      headers: {
        'Authorization': 'Bearer ' + this.local.get('access_token')
      }
    });
  }

  public createCollection(): Observable<any> {
    let body = {
      title: 'task-image-elinext'
    }
    return this.httpWithoutInterceptor.post('https://task-img-elinext.herokuapp.com/collection', JSON.stringify(body), {
      headers: {
        'Authorization': 'Bearer ' + this.local.get('access_token'),
        'content-type': 'application/json; charset=utf-8'
      }
    });
  }

}
