import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseappurl = '';
  header: HttpHeaders;
  flatDetail = new BehaviorSubject("");

  constructor(private http: HttpClient) {
     this.header = this.setHeaders();
     this.getConfigUrl();
     const flat = localStorage.getItem('flat');
     if (flat) {
        this.flatDetail.next(flat); 
     }
   }

  private setHeaders(): HttpHeaders {
    const hdrObj = { 'Content-Type': 'application/json' };
    
    const ret = new HttpHeaders(hdrObj);
    return ret;

}

getConfigUrl() {
    this.baseappurl = environment.baseappurl;
    if (!this.baseappurl.endsWith("/")) {
        this.baseappurl = this.baseappurl + "/";
    }
    console.log("Base App URL= " + this.baseappurl);
}

getURL(url: string): string {
    if (url.toLowerCase().startsWith("http://") || url.toLowerCase().startsWith("https://") ||
        url.toLowerCase().startsWith("./")) {
        return url;
    }
    return this.baseappurl + (url.startsWith("/") ? url.substr(1) : url);
}

getData(mappingURL: string) {
    var resp = this.http.get(this.getURL(mappingURL), { headers: this.header })
        .pipe(map((res: any) => res));
    return resp;
}

getCompleteUrl(url: string) {
    const getUrl = this.http.get(this.getURL(url), { headers: this.header });
    return getUrl;
}

postData(mappingURL: string, modelData: any) {
    return this.postDataWithHeader(mappingURL, modelData, null);
}

getHeaders(customHeaders: any): HttpHeaders {
  const hdrObj: any = {};
  this.header.keys().forEach(k => {
      const v = this.header.getAll(k);
      hdrObj[k] = v;
  });

  for (let k in customHeaders) {
      var matchedKey = null;
      this.header.keys().forEach(e => {
          if (e.toLowerCase() == k.toLowerCase()) {
              matchedKey = e;
          }
      });
      const val = customHeaders[k];
      if (matchedKey != null) {
          if (val == null) {
              // delete data from hdrObj
              delete hdrObj[matchedKey];
          } else {
              hdrObj[matchedKey] = val;
          }
      } else if (val != null) {
          hdrObj[k] = val;
      }
  }
  return new HttpHeaders(hdrObj);
}

postDataWithHeader(mappingURL: string, modelData: any, optionalHeader: any) {

  const hdrObj = optionalHeader ? this.getHeaders(optionalHeader) : this.header;

  return this.http.post(this.getURL(mappingURL), modelData, { headers: hdrObj })

      .pipe(map((res: any) => res));

}

viewFlat(data: any) {
    localStorage.setItem('flat', data);
    this.flatDetail.next(data);
}

}
