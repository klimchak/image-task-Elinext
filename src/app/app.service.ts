import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalStorageService} from "angular-web-storage";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private local: LocalStorageService) {
  }

  public photoUrl$ = new Subject<any>();

  public changePhotoUrl(photoUrl: any) {
    this.photoUrl$.next(photoUrl);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    let currentUser = JSON.parse(this.local.get('currentUser'));
    if (currentUser && currentUser.authdata) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${currentUser.authdata}`
        }
      });
    }

    return next.handle(request);
  }

}
