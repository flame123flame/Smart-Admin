import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { empty, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service.';
import { CommonService } from './ common.service';

declare var apiPath: string;

@Injectable()
export class AjaxService {

  public static CONTEXT_PATH = apiPath + "/api/";
  public static CONTEXT_PATH_EXPORT = apiPath + "/export/";
  public static CONTEXT_PATH_LOGIN = apiPath + "/";
  public static isDebug = false;
  private httpOptions: any;
  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private router: Router,
    private user: UserService,
    private commonService: CommonService
  ) {
    //console.log("apiPath", apiPath);
    //  //console.log("user token "+ user.getToken());
    //  //console.log("user.currentUserValue",user.currentUserValue.token);

  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private doHandleError = (error: any) => {

    this.commonService.unLoading();
    if (error.status == 401) {
      this.router.navigate(['/login']);
    }
    return Promise.reject(error.message || error);
  }

  doPost(url: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user.currentUserValue.token}`
      })
    };
    if (AjaxService.isDebug) {
      //console.log("URL : ", AjaxService.CONTEXT_PATH + url);
      //console.log("Params : ", body);
    }
    this.commonService.loading();
    return this.httpClient.post(AjaxService.CONTEXT_PATH + url, body, httpOptions).pipe(
      map((response: any) => {
        this.commonService.unLoading();
        return response;
      }),
      catchError(this.doHandleError)
    );
  }

  doGet(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user.currentUserValue.token}`
      })
    };
    if (AjaxService.isDebug) {
      //console.log("URL : ", AjaxService.CONTEXT_PATH + url);
    }
    this.commonService.loading();
    return this.httpClient.get(AjaxService.CONTEXT_PATH + url, httpOptions).pipe(
      map((response: any) => {
        this.commonService.unLoading();
        return response;
      }),
      catchError(this.doHandleError)
    );
  }

  doPut(url: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user.currentUserValue.token}`
      })
    };
    if (AjaxService.isDebug) {
      //console.log("URL : ", AjaxService.CONTEXT_PATH + url);
      //console.log("Params : ", body);
    }
    this.commonService.loading();
    return this.httpClient.put(AjaxService.CONTEXT_PATH + url, body, httpOptions).pipe(
      map((response: any) => {
        this.commonService.unLoading();
        return response;
      }),
      catchError(this.doHandleError)
    );
  }

  doDelete(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.user.currentUserValue.token}`
      })
    };
    if (AjaxService.isDebug) {
      //console.log("URL : ", AjaxService.CONTEXT_PATH + url);
    }
    this.commonService.loading();
    return this.httpClient.delete(AjaxService.CONTEXT_PATH + url, httpOptions).pipe(
      map((response: any) => {
        this.commonService.unLoading();
        return response;
      }),
      catchError(this.doHandleError)
    );
  }

  // private doHandleError(err, caught) {
  //   this.commonService.unLoading();
  //   if (err.status == 401) {
  //     window.location.reload();
  //     if (AjaxService.isDebug) {
  //       console.error("Redirect to LoginPage");
  //     }
  //   } else {
  //     if (AjaxService.isDebug) {
  //       console.error("Message Error => ", err, caught);
  //     }
  //   }
  //   return empty();
  // }

  upload(url: string, body: any, success: any, error?: any, header?: Headers) {
    if (AjaxService.isDebug) {
      //console.log("URL : ", AjaxService.CONTEXT_PATH + url);
      //console.log("Params : ", body);
    }
    var headers = new Headers({ 'Authorization': `Bearer ${this.user.currentUserValue.token}` });
    let errorFn = this.handleError;
    if (error) {
      errorFn = error;
    }
    //console.log(body, " ", headers);

    return this.http
      .post(AjaxService.CONTEXT_PATH + url, body, { headers: headers })
      .toPromise()
      .then(success)
      .catch(errorFn);
  }

  download(url: string) {
    // let full_url = AjaxService.CONTEXT_PATH + url;
    let full_url = AjaxService.CONTEXT_PATH_EXPORT + url;
    window.open(full_url, 'Download');
  }

  downloadfileInajax(url: string) {
    window.location.href = AjaxService.CONTEXT_PATH + url;
  }
  exportpdf(parm: string) {
    // let full_url = AjaxService.CONTEXT_PATH + url;
    window.location.href = apiPath + '/api/pdf/service-pdf/' + parm;
    // window.open(full_url, 'Download');
  }
  exportpdfV2(parm: string) {
    // let full_url = AjaxService.CONTEXT_PATH + url;
    window.location.href = apiPath + '/api/pdfele/service-pdf-ele/' + parm;
    // window.open(full_url, 'Download');
  }
  exportpdfWaterV2(parm: string) {
    // let full_url = AjaxService.CONTEXT_PATH + url;
    window.location.href = apiPath + '/api/pdfwater/service-pdf-water/' + parm;
    // window.open(full_url, 'Download');
  }

  exportpdfComuniV2(parm: string) {
    window.location.href = apiPath + '/api/pdfcommu/service-pdf-commu/' + parm;
  }

  exportpdfItV2(parm: string) {
    window.location.href = apiPath + '/api/pdfit/service-pdf-it/' + parm;
  }
  exportpdfposV2(parm: string) {
    window.location.href = apiPath + '/api/pdfpos/service-pdf-pos/' + parm;
  }
  exportpdfheaV2(parm: string) {
    window.location.href = apiPath + '/api/pdfheavyeqp/service-pdf-heavyeqp/' + parm;
  }

  exportpdfFirebrigadeV2(parm: string) {
    window.location.href = apiPath + '/api/pdffirebrigade/service-pdf-firebrigade/' + parm;
  }

  doPostLogin(url: string, body: any) {
    this.commonService.loading();
    if (AjaxService.isDebug) {
      //console.log("URL : ", url);
      //console.log("Params : ", body);
    }
    //console.log("login", AjaxService.CONTEXT_PATH_LOGIN+url);
    return this.httpClient.post(AjaxService.CONTEXT_PATH_LOGIN + url, body).pipe(
      map((response: any) => {
        this.commonService.unLoading();
        return response;
      }),
      catchError((err, caught) => {
        this.commonService.unLoading();
        console.error("Message Error => ", err, caught);

        return throwError(err);
      })
    );
  }
}
