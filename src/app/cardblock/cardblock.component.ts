import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService, SessionStorageService, LocalStorage, SessionStorage} from 'angular-web-storage';
import {apikeys} from "../app.apikey";

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
  urlImage: string | undefined;
  tags: string[] | undefined;
  response: any;
  ind: number | undefined;
  removeBookmark: boolean = false;

  constructor(
    private http: HttpClient,
    private local: LocalStorageService) {
  }

  ngOnInit(): void {
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
      if (response && this.get()){
        this.removeBookmark = true;
      }
    })
  }

  set() {
    this.local.set(this.response.photo.id, JSON.stringify(this.response));
    this.removeBookmark = true;
  }

  remove() {
    this.local.remove(this.response.photo.id);
    this.removeBookmark = false;
  }

  get() {
    let value = this.local.get(this.response.photo.id);
    return value != null;
  }

  clear() {
    this.local.clear();
  }

}
