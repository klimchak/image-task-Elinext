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
  dataStorageRaindrop: any;
  dataNotFound: boolean = true;
  @Input() loginToRaindrop: any;
  @Input() mapIdRaindrop = new Map<string, string>();
  constructor(
    private localStorage: LocalStorageService,
    private readonly dataService: DataService,
    private httpClient: HttpClient,
    private httpBackend: HttpBackend,
    private local: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.dataService.mapIdPhotos$.subscribe((value) => {
      this.mapIdRaindrop = value;
    });
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
    this.dataService.getBookmarksFromRaindrop().subscribe((response) => {
      this.dataStorageRaindrop = response;
      this.dataStorage = this.dataStorageRaindrop.items;
      console.log('this.dataStorageRaindrop', this.dataStorageRaindrop)
    });
  }
}
