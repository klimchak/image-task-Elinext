import { Injectable } from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch'
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable()
export class AppInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // if (req.method == "GET"){
    //   return ;
    // }
    console.log('iiiiiii',req)

    const request = req.clone({
      headers: req.headers
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Expose-Headers', 'ETag, Content-Type, Accept, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset')
        .set('Access-Control-Allow-Credentials', 'true')
        .delete('Content-Type')
        .delete('Origin')
        .set('Content-Type', 'application/json')
        .set('Origin', 'https://api.raindrop.io')
        .set('Sec-Fetch-Mode', 'no-cors'),
      withCredentials: true,
    });
    // const request = req.clone({
    //   headers: req.headers
    //     .set('Sec-Fetch-Mode', 'no-cors'),
    //   withCredentials: true,
    // });
    return next.handle(request)
  }
}
