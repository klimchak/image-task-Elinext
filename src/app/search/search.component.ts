import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageEvent} from '@angular/material/paginator';
import {apikeys} from "../app.apikey";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  length: number | undefined;
  pageSize: number = 12;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  response: any = null;
  searchMessage: string = "";

  constructor(private http: HttpClient, public pageEvent: PageEvent) {
  }

  getNextPage(event: any): void {
    console.log(event)
    this.searchImage(null,  event.pageIndex + 1, event.pageSize);
  }

  searchImage(event: any, pageNumber = 1, pageSize = 12) {
    console.log(this.searchMessage)
    event != null? event.preventDefault(): null;
    this.http.get('https://www.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.search',
        api_key: apikeys.flick,
        text: this.searchMessage,
        format: 'json',
        nojsoncallback: '1',
        per_page: pageSize,
        page: pageNumber
      },
    }).subscribe((response) => {
      this.response = response;
      this.length = this.response.photos.pages;
      console.log(response)
    })
  }

  ngOnInit(): void {

  }


}
