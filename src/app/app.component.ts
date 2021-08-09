import {Component, OnInit, OnDestroy} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogLoginComponent} from "./dialog-login/dialog-login.component";

import { DataService } from "./app.service";
import { Subscription } from 'rxjs';
import {DialogLoginPocketComponent} from "./dialog-login-pocket/dialog-login-pocket.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription;
  openDialogLogin: boolean = false;
  animal: string | undefined;
  name: string | undefined;

  userPhoto: string | undefined;

  constructor(
    public dialog: MatDialog,
    private readonly dataService: DataService
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '350px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogPocket(): void {
    const dialogRef = this.dialog.open(DialogLoginPocketComponent, {
      width: '400px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
    this.subs = this.dataService.photoUrl$.subscribe((value) => this.setPhotoUrl(value));
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  setPhotoUrl(data: string){
    console.log(data)
    this.userPhoto = data;
  }
  // логика на странице
  containerSearch: boolean = true;
  containerBookmark: boolean = false;

  setScreenSearch() {
    this.containerSearch = true;
    this.containerBookmark = false;
  }

  setScreenBookmark() {
    this.containerSearch = false;
    this.containerBookmark = true;
  }
}
