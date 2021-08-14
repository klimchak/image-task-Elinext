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

  private userActivity: any;
  private userInactive: Subject<any> = new Subject();

  private httpWithoutInterceptor = new HttpClient(this.httpBackend);

  public photoUrl$ = new Subject<any>();
  public photoUrlRaindrop$ = new Subject<any>();
  public loginToRaindrop$ = new Subject<any>();
  public photoUrl = '';
  public photoUrlRaindrop = '';
  public loginToRaindrop = false;
  public mapIdPhotos$ = new Map<string, string>();

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

  public getUserData(): Observable<any> {
    return this.httpWithoutInterceptor.get('https://task-img-elinext.herokuapp.com/user', {
      headers: {
        'Authorization': 'Bearer ' + this.local.get('access_token')
      }
    });
  }

  public getFlickrPhoto(text: string, per_page: number, page: number): Observable<any> {
    return this.httpWithoutInterceptor.get('https://www.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.search',
        api_key: apikeys.flick,
        text: text,
        format: 'json',
        nojsoncallback: '1',
        per_page: per_page,
        page: page
      },
    });
  }
  public getFlickrPhotoInfo(photo_id: string, secret: string): Observable<any> {
    return this.httpWithoutInterceptor.get('https://www.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.getInfo',
        api_key: apikeys.flick,
        photo_id: photo_id,
        secret: secret,
        format: 'json',
        nojsoncallback: '1'
      },
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

  public saveToRaindrop(link: string, idPhoto: string, tags: string[]): Observable<any> {
    return this.httpWithoutInterceptor.post('https://task-img-elinext.herokuapp.com/raindrop', {
      link: link,
      title: idPhoto,
      tags: tags,
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
    });
  }

  public getBookmarksFromRaindrop(): Observable<any> {
    return this.httpWithoutInterceptor.get('https://task-img-elinext.herokuapp.com/raindrops/' + this.local.get('collection_id'), {
      headers:{
        'Authorization': 'Bearer ' + this.local.get('access_token')
      }
    });
  }
}
