import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
// import {Imagedata} from "./imagedata";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // imagedata: Imagedata | undefined;
  // constructor() { }
  //
  // getData(){
  //   this.http.get('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=cb3e97553e235bd32b2fa493a878398a&text=car&format=json&nojsoncallback=1')
  //     .subscribe((data:any) => this.imagedata=new Imagedata(data.page, data.pages, data.perpage, data.total ));
  //   return this.imagedata;
  // }
}
