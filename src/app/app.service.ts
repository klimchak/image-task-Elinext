import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {LocalStorageService} from "angular-web-storage";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {
  }

  public photoUrl$ = new Subject<any>();

  public changePhotoUrl(photoUrl: any) {
    this.photoUrl$.next(photoUrl);
  }

}
