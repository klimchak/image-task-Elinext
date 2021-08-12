import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AppInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== 'https://www.flickr.com/services/rest/'){
      const requestRaindrop = req.clone({
        headers: req.headers
          .set('Authorization', 'Bearer 88296e43-c4fe-4881-8a98-cdb8a8a6e2a6')
      })
      return next.handle(requestRaindrop)
    }else {
      const requestFlickr = req.clone();
      return next.handle(requestFlickr)
    }
  }
}
