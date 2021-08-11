import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AppInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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
        .set('TE', ' trailers'),
      withCredentials: true,
    });
    console.log('cloneResp', request)

    return next.handle(request)


  }
}
