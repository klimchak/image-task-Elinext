import {Component, Input, OnInit} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'angular-web-storage';
import {apikeys} from "../app.apikey";
import {DataService} from "../app.service";

@Component({
  selector: 'app-cardblock',
  templateUrl: './cardblock.component.html',
  styleUrls: ['./cardblock.component.css']
})

export class CardblockComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() idImage: string = "";
  @Input() secret: string = "";
  @Input() bookmarkPage: boolean = false;
  @Input() loginToRaindrop: any;
  urlImage: string | undefined;
  tags: string[] | undefined;
  response: any;
  ind: number | undefined;
  removeBookmark: boolean = false;
  httpWithoutInterceptor = new HttpClient(this.httpBackend);
  req: any;

  constructor(
    private http: HttpClient,
    private local: LocalStorageService,
    private httpBackend: HttpBackend,
    private readonly dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.loginToRaindrop$.subscribe((value) => {
      this.loginToRaindrop = value;
    });
    this.http.get('https://www.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.getInfo',
        api_key: apikeys.flick,
        photo_id: this.idImage,
        secret: this.secret,
        format: 'json',
        nojsoncallback: '1'
      },
    }).subscribe((response) => {
      this.response = response;
      if (response && this.get()) {
        this.removeBookmark = true;
      }
    })
  }

  setRaindrop() {
    this.httpWithoutInterceptor.post('https://api.raindrop.io/rest/v1/raindrop', {
      link: "https://live.staticflickr.com/" + this.response.photo.server + "/" + this.response.photo.id + "_" + this.response.photo.secret + ".jpg"
    }, {
      headers: {
        'Authorization': 'Bearer 65f8e71c-ecd5-4743-828d-a79718168070'
      },
      withCredentials: true
    }).subscribe((response) => {
      this.req = response;
      console.log('getpocket.com', this.req)
    });
    let httpWithoutInterceptor = new HttpClient(this.httpBackend);
    httpWithoutInterceptor.get('https://api.raindrop.io/rest/v1/collections', {
      headers: {
        'Authorization': 'Bearer 65f8e71c-ecd5-4743-828d-a79718168070'
      },
      withCredentials: true
    }).subscribe((response) => {
      // this.req = response;
      console.log('raindrop.io', response)
    });

    this.httpWithoutInterceptor.get('https://api.raindrop.io/rest/v1/collections', {
      headers: {
        'Authorization': 'Bearer 65f8e71c-ecd5-4743-828d-a79718168070'
      },
      withCredentials: true
    }).subscribe((response) => {
      // this.req = response;
      console.log('raindrop.io', response)
    });
    this.removeBookmark = true;
  }

  set() {
    this.local.set(this.response.photo.id, JSON.stringify(this.response));
    this.removeBookmark = true;
  }

  removeRaindrop() {
    this.local.remove(this.response.photo.id);
    this.removeBookmark = false;
  }

  remove() {
    this.local.remove(this.response.photo.id);
    this.removeBookmark = false;
  }

  get() {
    let value = this.local.get(this.response.photo.id);
    return value != null;
  }


}

// let httpWithoutInterceptor = new HttpClient(this.httpBackend);
//
// httpWithoutInterceptor.post('https://api.raindrop.io/rest/v1/raindrop', {
//   link: "https://www.youtube.com/watch?v=GgGhluXCqx0"
// },{
//   headers: {
//     'Authorization': 'Bearer 88296e43-c4fe-4881-8a98-cdb8a8a6e2a6'
//   }
// }).subscribe((response) => {
//   this.req = response;
//   console.log('getpocket.com', this.req)
// });
// httpWithoutInterceptor.get('https://api.raindrop.io/rest/v1/collections', {
//   headers: {
//     'Authorization': 'Bearer 88296e43-c4fe-4881-8a98-cdb8a8a6e2a6'
//   }
// }).subscribe((response) => {
//   this.req = response;
//   console.log('getpocket.com', this.req)
// });
