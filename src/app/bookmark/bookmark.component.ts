import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {LocalStorageService} from "angular-web-storage";
import {DataService} from "../app.service";

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit, OnChanges {
  dataStorage = new Array();
  dataNotFound: boolean = true;
  req: any;
  @Input() loginToRaindrop: any;
  @Input() mapIdRaindrop: Map<string, string> | undefined;
  constructor(
    private localStorage: LocalStorageService,
    private readonly dataService: DataService
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
    this.dataService.getBookmarksFromRaindrop().subscribe((response) => {
      this.req = response;
      this.dataStorage = this.req.items;
    });
  }
}
