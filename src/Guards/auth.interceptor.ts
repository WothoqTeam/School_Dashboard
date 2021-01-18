import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BanksService } from 'src/app/Services/allData';
import {  AddDataService  } from 'src/app/Services/adddata.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private myApi: BanksService,private addApi: AddDataService,) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('usertoken'); 

    if (token && request.url.includes(`${this.myApi.BaseURI}/admin/banks/get-all-banks`) ||
    (`{${this.myApi.BaseURI}/admin/applications/get-all-applications}`)|| (`{${this.myApi.BaseURI}/admin/branches/get-all-branches}`)||
    (`{${this.myApi.BaseURI}/admin/cost/get-all-studyCosts)`)|| (`{${this.myApi.BaseURI}/admin/exams/getAllExams)`)||(`{${this.myApi.BaseURI}/users/get-all-users`)||
    (`{${this.addApi.BaseURI}/admin/branches/store)`)||(`${this.addApi.BaseURI}/admin/branches/destroy`) ||
    (`{${this.addApi.BaseURI}/admin/banks/store)`)||(`{${this.addApi.BaseURI}/admin/cost/store)`) || (`${this.myApi.BaseURI}/admin/teachers/get-all-teachers`)
    ||(`{${this.myApi.BaseURI}/admin/zoom/get-all-video-classes)`)||(`${this.addApi.BaseURI}/admin/schedules/store`)) {
      request= request.clone({headers: request.headers.set('Authorization', 'Bearer' + token)});
      return next.handle(request);
    }
    else{
    return next.handle(request);
  }
  }
}
