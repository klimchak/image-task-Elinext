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
        body: req.body,
        headers: req.headers
          .set('Accept', 'application/json, text/plain, */*')
          .set('Accept-Encoding', 'gzip, deflate, br')
          .set('Referer', 'https://task-img-elinext.herokuapp.com/')
          .set('Access-Control-Allow-Origin', 'https://task-img-elinext.herokuapp.com/')
          .set('Access-Control-Expose-Headers', 'ETag, Content-Type, Accept, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset')
          .set('Access-Control-Allow-Credentials', 'true')
          .set('Host', 'getpocket.com')
          .set('X-Accept', 'application/json')
          .set('Origin', 'https://task-img-elinext.herokuapp.com')
          .set('Connection', 'keep-alive')
          .set('Sec-Fetch-Dest', 'empty')
          .set('Sec-Fetch-Mode', 'no-cors')
          .set('Sec-Fetch-Site', 'cross-site')
          .set('Pragma', 'no-cache')
          .set('Cache-Control', 'no-cache')
          .set('TE',' trailers'),
        withCredentials: true,
      });
      console.log('cloneResp', request)
      // const request = req.clone({
      //   headers: req.headers
      //     .set('Sec-Fetch-Mode', 'no-cors'),
      //   withCredentials: true,
      // });
      return next.handle(request)
    }

  }
}
