import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "angular-web-storage";

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  dataStorage = new Array();
  dataNotFound: boolean = true;

  constructor(
    private localStorage: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    if (Object.keys(localStorage).length != 0){
      this.dataNotFound = false;
      let keys = Object.keys(localStorage);
      for (let i = 0; i < keys.length; i++){
        let val = this.localStorage.get(keys[i]);
        let oldResponse = JSON.parse(val);
        this.dataStorage.push(oldResponse.photo);
      }
    }
  }

}
