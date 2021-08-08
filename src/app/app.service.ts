import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public photoUrl$ = new Subject<any>();

  public changePhotoUrl(photoUrl: any) {
    this.photoUrl$.next(photoUrl);
  }
}
