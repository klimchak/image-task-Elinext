import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../app.service";
import {apikeys} from "../app.apikey";

@Component({
  selector: 'app-dialog-login-raindrop',
  templateUrl: './dialog-login-raindrop.component.html',
  styleUrls: ['./dialog-login-raindrop.component.css']
})
export class DialogLoginRaindropComponent implements OnInit {
  public loginToRaindrop = this.dataService.loginToRaindrop;
  constructor(
    public dialogRef: MatDialogRef<DialogLoginRaindropComponent>,
    private readonly dataService: DataService
  ) {
  }

  ngOnInit() {
    this.dataService.loginToRaindrop$.subscribe((value) => {
      this.loginToRaindrop = value;
    });
  }

  pressLogin() {
    window.location.href = "https://raindrop.io/oauth/authorize?redirect_uri=https://task-img-elinext.herokuapp.com&client_id=" + apikeys.raindropApi.client_id;
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
