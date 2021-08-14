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
  @Input() mapIdRaindrop: any;
  @Input() urlImageRaindrop: any;
  tags: string[] | undefined;
  response: any;
  ind: number | undefined;
  removeBookmark: boolean = false;
  httpWithoutInterceptor = new HttpClient(this.httpBackend);
  req: any;
  idInRaindrop: any;
  constructor(
    private http: HttpClient,
    private local: LocalStorageService,
    private httpBackend: HttpBackend,
    private readonly dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.mapIdPhotos$.subscribe((value) => {
      this.mapIdRaindrop = value;
    });
    this.dataService.loginToRaindrop$.subscribe((value) => {
      this.loginToRaindrop = value;
    });
    if (!this.loginToRaindrop){
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
        if(!this.loginToRaindrop){
          if (response && this.get()) {
            this.removeBookmark = true;
          }
        }else {
          console.log('this.mapIdRaindrop.get(this.idImage)', this.mapIdRaindrop.get(this.idImage))
          if(this.mapIdRaindrop.get(this.idImage)){
            console.log('this.mapIdRaindrop.get(this.idImage)', this.mapIdRaindrop.get(this.idImage))
            this.removeBookmark = true;
          }
        }
      });
    }

  }

  setRaindrop() {
    let link = "https://live.staticflickr.com/" + this.response.photo.server + "/" + this.response.photo.id + "_" + this.response.photo.secret + ".jpg";
    this.dataService.saveToRaindrop(link, this.response.photo.id).subscribe((response) => {
      this.req = response;
      this.idInRaindrop = this.req.item._id;
      this.mapIdRaindrop.set(this.response.photo.id, this.req.item._id);
      console.log('save link to raindrop', response)
    });
    this.removeBookmark = true;
  }

  set() {
    this.local.set(this.response.photo.id, JSON.stringify(this.response));
    this.removeBookmark = true;
  }

  removeRaindrop() {
    this.dataService.removeFromRaindrop(this.idInRaindrop).subscribe((response) => {
      this.req = response;
      if (this.req.result) {
        this.mapIdRaindrop.delete(this.response.photo.id);
        this.removeBookmark = false;
      }
      console.log('removeRaindrop', this.req)
    });
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
