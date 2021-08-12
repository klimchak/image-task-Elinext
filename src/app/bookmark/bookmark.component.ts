import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {LocalStorageService} from "angular-web-storage";
import {DataService} from "../app.service";
import {HttpBackend, HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit, OnChanges {
  dataStorage = new Array();
  dataNotFound: boolean = true;
  @Input() loginToRaindrop: any;

  constructor(
    private localStorage: LocalStorageService,
    private readonly dataService: DataService,
    private httpClient: HttpClient,
    private httpBackend: HttpBackend
  ) {
  }



  ngOnInit(): void {
    this.dataService.loginToRaindrop$.subscribe((value) => {
      this.loginToRaindrop = value;
    });
    if (this.loginToRaindrop && this.dataStorage.length == 0) {
      this.getPhotosRaindrop();
    }
    if (!this.loginToRaindrop && this.dataStorage.length == 0) {
      this.getPhotosLocalStorage();
    }
  }

  ngOnChanges() {
    if (!this.loginToRaindrop) {
      this.dataStorage = [];
      this.getPhotosLocalStorage();
    } else {
      this.dataStorage = [];
      this.getPhotosRaindrop();
    }
  }

  getPhotosLocalStorage() {
    if (Object.keys(localStorage).length != 0) {
      this.dataNotFound = false;
      let keys = Object.keys(localStorage);
      for (let i = 0; i < keys.length; i++) {
        let val = this.localStorage.get(keys[i]);
        let oldResponse = JSON.parse(val);
        this.dataStorage.push(oldResponse.photo);
      }
    }
  }

  getPhotosRaindrop() {
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
  }
}
