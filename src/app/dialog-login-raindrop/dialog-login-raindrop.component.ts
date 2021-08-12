import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../app.service";
import {HttpBackend, HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dialog-login-raindrop',
  templateUrl: './dialog-login-raindrop.component.html',
  styleUrls: ['./dialog-login-raindrop.component.css']
})
export class DialogLoginRaindropComponent implements OnInit {
  public loginToRaindrop = this.dataService.loginToRaindrop;
  req: any;
  constructor(
    public dialogRef: MatDialogRef<DialogLoginRaindropComponent>,
    private readonly dataService: DataService,
    private httpClient: HttpClient,
    private httpBackend: HttpBackend
  ) {
  }

  ngOnInit() {
    this.dataService.loginToRaindrop$.subscribe((value) => {
      this.loginToRaindrop = value;
    });
  }

  pressLogin() {
    let httpWithoutInterceptor = new HttpClient(this.httpBackend);
    httpWithoutInterceptor.get('https://task-img-elinext.herokuapp.com/authorize', {
      params: {
        'redirect_uri': 'https://task-img-elinext.herokuapp.com',
        'client_id': '611123ddcf708e9b6838133b'
      },
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    }).subscribe((response) => {
      this.req = response;
      console.log('bookmarksbookmarks', response)
    });


    const winHtml = this.req.error.text;

    const winUrl = URL.createObjectURL(
      new Blob([winHtml], {type: "text/html"})
    );

    const win = window.open(
      winUrl,
      "win",
      `width=1024,height=768,screenX=200,screenY=200`
    );


    // if (!this.loginToRaindrop) {
    //   this.dataService.changePhotoUrlRaindrop("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTmr2GzVIC2tOD7CTwHBQyh0BpIBBBJpE2g&usqp=CAU");
    //   this.dataService.changeloginToRaindrop(true);
    //   this.dataService.loginToRaindrop = true;
    // } else {
    //   this.dataService.changePhotoUrlRaindrop(null);
    //   this.dataService.changeloginToRaindrop(false);
    //   this.dataService.loginToRaindrop = false;
    // }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
