import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { appApiResources } from '../constants/app.constants';
import { HttpService } from '../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class userDetailsStore {

  public userData = new BehaviorSubject<any>(null);
  public userData1 = new BehaviorSubject<any>(null);
  // reg_id: any;

  constructor(
    private http: HttpService
  ) {
    this.getUserData();
  }

  getUserData() {
    if (!localStorage.getItem('token')) return;
    this.http.get(appApiResources.getUserData).subscribe({
      next: (data: any) => {
        if (data?.data) this.userData.next(data.data);
        else this.userData.next(null)
      },
      error: error => {
        this.userData.next(null);
      }
    })
  }
  getUserDetail() {
    return this.userData.asObservable();
  }

}
