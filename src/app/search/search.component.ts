import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageEvent} from '@angular/material/paginator';
import {apikeys} from "../app.apikey";
import {DataService} from "../app.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  @Input() loginToRaindrop: any;
  @Input() mapIdRaindrop: any;
  length: number | undefined;
  pageSize: number = 12;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  response: any = null;
  searchMessage: string = "";

  constructor(
    private http: HttpClient,
    public pageEvent: PageEvent,
    private readonly dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.mapIdPhotos$.subscribe((value) => {
      this.mapIdRaindrop = value;
    });
    this.dataService.loginToRaindrop$.subscribe((value) => {
      this.loginToRaindrop = value;
    });
    console.log('search', this.loginToRaindrop)
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




}
