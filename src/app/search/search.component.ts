import { Component, OnInit } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { SearchService } from './search.service';
import { Imagedata } from "./imagedata";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  response: any;
  searchMessage: string = "";
  // length: number;
  // pageSize: number;
  // pageSizeOptions
  // showFirstLastButtons
  // (page)="pageEvent = initImages($event); paginatorBottom.pageIndex = $event.pageIndex"
  url :string = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=cb3e97553e235bd32b2fa493a878398a&text=car&format=json&nojsoncallback=1&per_page=8';

  constructor(private http: HttpClient) { }

  getSearchValue(event: any){
    this.searchMessage = event.target.value;
  }

  searchImage(event: any){
    console.log(this.searchMessage)
    event.preventDefault();
    this.http.get('https://www.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.search',
        api_key: 'key',
        text: this.searchMessage,
        format: 'json',
        nojsoncallback: '1',
        per_page: '8'
      },
    }).subscribe((response) => {
      this.response = response;
    })
  }

  ngOnInit(): void {

  }




}
