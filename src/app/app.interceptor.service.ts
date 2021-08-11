import { Injectable } from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {EMPTY, NEVER, Observable} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable()
export class AppInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // if (req.method == "GET"){
    //   return ;
    // }
    console.log('iiiiiii', '\n', req, '\n', req.method)
    if (req.method == 'OPTIONS'){
      console.log('EMPTY',req, req.method)
      return EMPTY;
    }
    else {
      const request = req.clone({
        headers: req.headers
          .set('Access-Control-Allow-Origin', 'https://task-img-elinext.herokuapp.com/')
          .set('Access-Control-Expose-Headers', 'ETag, Content-Type, Accept, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset')
          .set('Access-Control-Allow-Credentials', 'true'),
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
}
