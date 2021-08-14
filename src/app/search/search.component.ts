import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PageEvent} from '@angular/material/paginator';
import {DataService} from "../app.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  @Input() loginToRaindrop: any;
  @Input() mapIdRaindrop: Map<string, string> | undefined;
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
    this.dataService.loginToRaindrop$.subscribe((value) => {
      this.loginToRaindrop = value;
    });
  }

  getNextPage(event: any): void {
    this.searchImage(null,  event.pageIndex + 1, event.pageSize);
  }

  searchImage(event: any, pageNumber = 1, pageSize = 12) {
    event != null? event.preventDefault(): null;
    this.dataService.getFlickrPhoto(this.searchMessage, pageSize, pageNumber).subscribe((response) => {
      this.response = response;
      this.length = this.response.photos.pages;
    })
  }
}
