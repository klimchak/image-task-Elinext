import {Component,Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../app.service";
import {DialogData} from "../dialog-login/dialog-login.component";
import {apikeys} from "../app.apikey";
import {HttpClient, HttpHeaders, HttpBackend, HttpRequest} from '@angular/common/http';

import {Router, ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-dialog-login-pocket',
  templateUrl: './dialog-login-pocket.component.html',
  styleUrls: ['./dialog-login-pocket.component.css']
})
export class DialogLoginPocketComponent implements OnInit {
  url = "https://app.raindrop.io/account/login?redirect=https%3A%2F%2Fapi.raindrop.io%2Fv1%2Foauth%2Fauthorize%3Fclient_id%3D611123ddcf708e9b6838133b%26redirect_uri%3Dhttps%253A%252F%252Ftask-img-elinext.herokuapp.com%252Flogin"
  // url = "https://app.raindrop.io/account/login?redirect=https%3A%2F%2Fapi.raindrop.io%2Fv1%2Foauth%2Fauthorize%3Fclient_id%3D611123ddcf708e9b6838133b%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A4200%252Flogin"
  opif = false;
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
    private httpBackend: HttpBackend,
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
    // this.submitted = true;
    //
    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }
    // let base = window.btoa(this.f.username.value + ':' + this.f.password.value);
    let body = {
      redirect_uri: 'https://task-img-elinext.herokuapp.com/login',
      client_id: '611123ddcf708e9b6838133b'
    };
    // let headers = new HttpHeaders();
    // headers = headers.append('Access-Control-Allow-Origin', 'https://task-img-elinext.herokuapp.com/login')
    // headers = headers.append('Access-Control-Expose-Headers', 'ETag, Content-Type, Accept, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset')
    // headers = headers.append('Access-Control-Allow-Credentials', 'true')
    // headers = headers.delete('Content-Type');
    // headers = headers.delete('Origin');
    // headers = headers.set('Content-Type', 'application/json')
    // headers = headers.set('Origin', 'https://api.raindrop.io')
    let obj = {
      'Access-Control-Allow-Origin': 'https://localhost:4200',
      'Access-Control-Expose-Headers': 'ETag, Content-Type, Accept, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json',
      'Origin': 'https://api.raindrop.io',
      'vary': 'Origin'
    }


    let httpOptions = {
      headers: new HttpHeaders(obj).set('Origin', 'https://api.raindrop.io'),
      params: body
    };
    let f = this.httpOptions.headers = new HttpHeaders(obj)
    console.log(f)
    let y = new HttpRequest('GET','https://raindrop.io/oauth/authorize', null, {headers:new HttpHeaders(obj)})
    this.httpBackend.handle(y).subscribe((response) => {
      this.req = response;
      console.log('authorization_code', this.req)
    })
    // this.http.get('https://raindrop.io/oauth/authorize',  httpOptions).subscribe((response) => {
    //   this.req = response;
    //   console.log('authorization_code', this.req)
    // })

  }


  openIframe(){
    window.open(this.url, "_blank");
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
