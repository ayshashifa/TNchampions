import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  baseurl = ''

  post(url: string, user: any) {
    return this.http.post(this.baseurl + url, user);
  }

  put(url: string, user: any) {
    return this.http.put(this.baseurl + url, user);
  }

  get(url: string) {
    return this.http.get(this.baseurl + url);
  }

  delete(url: string) {
    return this.http.delete(this.baseurl + url);
  }

}
