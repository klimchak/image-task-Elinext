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
  @Input() mapIdRaindrop: Map<string, string> | undefined;
  @Input() urlImageRaindrop: any;
  @Input() tags: any;
  response: any;
  removeBookmark: boolean = false;
  req: any;
  idInRaindrop: any;

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
    if ((!this.loginToRaindrop && this.bookmarkPage) || (!this.loginToRaindrop && !this.bookmarkPage) || (this.loginToRaindrop && !this.bookmarkPage)) {
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
        if (this.response && this.getLocal()) {
          this.removeBookmark = true;
        }
      });
    }
    if ((this.loginToRaindrop && this.bookmarkPage) || (this.loginToRaindrop && !this.bookmarkPage)) {
      if (this.dataService.mapIdPhotos$.get(this.idImage)) {
        this.idInRaindrop = this.dataService.mapIdPhotos$.get(this.idImage);
        this.removeBookmark = true;
      }
    }
  }

  setRaindrop() {
    let tags = [];
    for (let i = 0; i < this.response.photo.tags.tag.length; i++) {
      tags.push(this.response.photo.tags.tag[i].raw);
    }
    let link = "https://live.staticflickr.com/" + this.response.photo.server + "/" + this.response.photo.id + "_" + this.response.photo.secret + ".jpg";
    this.dataService.saveToRaindrop(link, this.response.photo.id, tags).subscribe((response) => {
      this.req = response;
      this.idInRaindrop = this.req.item._id;
      this.dataService.mapIdPhotos$.set(this.response.photo.id, this.req.item._id);
    });
    this.removeBookmark = true;
  }

  set() {
    this.local.set(this.idImage, JSON.stringify(this.response));
    this.removeBookmark = true;
  }

  removeRaindrop() {
    this.dataService.removeFromRaindrop(this.idInRaindrop).subscribe((response) => {
      this.req = response;
      if (this.req.result) {
        this.dataService.mapIdPhotos$.delete(this.idImage);
        this.removeBookmark = false;
      }
    });
  }

  remove() {
    this.local.remove(this.idImage);
    this.removeBookmark = false;
  }

  getLocal() {
    let value = this.local.get(this.idImage);
    return value != null;
  }

  getMap() {
    let value = this.dataService.mapIdPhotos$.get(this.idImage)
    return value != null;
  }
}
