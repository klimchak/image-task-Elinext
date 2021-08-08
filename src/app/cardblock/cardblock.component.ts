import {Component, Input, OnInit} from '@angular/core';
import { HttpClient }   from '@angular/common/http';

@Component({
  selector: 'app-cardblock',
  templateUrl: './cardblock.component.html',
  styleUrls: ['./cardblock.component.css']
})
export class CardblockComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() idImage: string = "";
  @Input() secret: string = "";
  urlImage: string | undefined;
  tags: string[] | undefined;
  response: any;
  ind: number | undefined;
  constructor(private http: HttpClient) { }

  filterTags(ind: number) {
    return ind >= 4
  }


  ngOnInit(): void {
    this.http.get('https://www.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.getInfo',
        api_key: '1c44ca9eb138464386fd49c999380764',
        photo_id: this.idImage,
        secret: this.secret,
        format: 'json',
        nojsoncallback: '1'
      },
    }).subscribe((response) => {
      this.response = response;
      console.log('card!!!!', this.response)
    })
  }

}
// https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=1c44ca9eb138464386fd49c999380764&photo_id=51358908046&secret=6ae0b23faf&format=json&
// // nojsoncallback=1&api_sig=a2071ebc518788447c7315573e946c2a
//
