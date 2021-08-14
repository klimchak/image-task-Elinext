import {Injectable} from '@angular/core';
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
  public mapIdPhotos$ = new Subject<Map<string, string>>();

  public addIdMapIdPhotos() {
    this.mapIdPhotos$.next();
  }

  // public removeIdMapIdPhotos() {
  //   this.mapIdPhotos.delete();
  // }

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

  public getLoginToRaindrop() {
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
      title: 'taskImageElinext'
    }
    return this.httpWithoutInterceptor.post('https://task-img-elinext.herokuapp.com/collection', JSON.stringify(body), {
      headers: {
        'Authorization': 'Bearer ' + this.local.get('access_token'),
        'content-type': 'application/json; charset=utf-8'
      }
    });
  }

  public saveToRaindrop(link: string, idPhoto: string): Observable<any> {
    return this.httpWithoutInterceptor.post('https://task-img-elinext.herokuapp.com/raindrop', {
      link: link,
      title: idPhoto,
      collection: {
        "$id": this.local.get('collection_id')
      }
    }, {
      headers: {'Authorization': 'Bearer ' + this.local.get('access_token')},
      withCredentials: true
    });
  }

  public removeFromRaindrop(idBookmark: string): Observable<any> {
    return this.httpWithoutInterceptor.delete('https://task-img-elinext.herokuapp.com/raindrop/' + idBookmark, {
      headers: {
        'Authorization': 'Bearer ' + this.local.get('access_token')
      },
      withCredentials: true
    })
  }
}
