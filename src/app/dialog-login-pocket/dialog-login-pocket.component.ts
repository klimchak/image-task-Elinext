import {Component,Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../app.service";
import {DialogData} from "../dialog-login/dialog-login.component";
import {apikeys} from "../app.apikey";
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Router, ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-dialog-login-pocket',
  templateUrl: './dialog-login-pocket.component.html',
  styleUrls: ['./dialog-login-pocket.component.css']
})
export class DialogLoginPocketComponent implements OnInit {
  loginForm: FormGroup | any;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';
  req: any;
  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<DialogLoginPocketComponent>,
    private readonly dataService: DataService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    let base = window.btoa(this.f.username.value + ':' + this.f.password.value);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + base);
    headers.set('Access-Control-Allow-Origin', '*')
    this.http.get(`https://www.instapaper.com/api/authenticate`,  {headers}).subscribe((data)=>{
      this.req = data;
      console.log(this.req);
    })
    // // this.loading = true;
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       console.log(data)
    //       // this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.error = error;
    //       this.loading = false;
    //     });
  }










  //
  // constructor(
  //   public dialogRef: MatDialogRef<DialogLoginPocketComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: DialogData,
  //   private readonly dataService: DataService,
  //   private http: HttpClient,
  // ) {
  // }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic' + btoa('admin:310b5678eece63336e4698d2722aad91')
    })
  }

  call() {
    return this.http
      .get<any>('https://www.instapaper.com/api/authenticate', this.httpOptions).subscribe((response) =>{
        this.req = response;
        console.log(response)
      })
  }


}




// @Component({
//   selector: 'app-dialog-login-pocket',
//   templateUrl: './dialog-login-pocket.component.html',
//   styleUrls: ['./dialog-login-pocket.component.css']
// })
// export class DialogLoginPocketComponent implements OnInit {
//   loginForm: FormGroup | any;
//   loading = false;
//   submitted = false;
//   returnUrl: string | undefined;
//   error = '';
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//
//   constructor(
//     private formBuilder: FormBuilder,
//     // private route: ActivatedRoute,
//     // private router: Router,
//     private authenticationService: AuthenticationService,
//     public dialogRef: MatDialogRef<DialogLoginPocketComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData,
//   ) {
//     // redirect to home if already logged in
//     // if (this.authenticationService.userValue) {
//     //   this.router.navigate(['/']);
//     // }
//   }
//
//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//
//     // get return url from route parameters or default to '/'
//     // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//   }
//
//   // convenience getter for easy access to form fields
//   get f() {
//     return this.loginForm.controls;
//   }
//
//   onSubmit() {
//     this.submitted = true;
//
//     // stop here if form is invalid
//     if (this.loginForm.invalid) {
//       return;
//     }
//
//     this.loading = true;
//     this.authenticationService.login(this.f.username.value, this.f.password.value)
//       .pipe(first())
//       .subscribe(
//         data => {
//           console.log(data)
//           // this.router.navigate([this.returnUrl]);
//         },
//         error => {
//           this.error = error;
//           this.loading = false;
//         });
//   }
// }
