import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_model/user';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public POS_ROLE = ['POS_UPLOADER', 'POS_VIEWER'];
  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  validateMenu(path) {
    let checking = this.currentUserSubject.value.authorities.find((val, i) => {
      return val === path;
    });

    if (checking) {
      return "true";
    } else {
      return "";
    }
  }
  validateMenu2(authorities, path) {
    let checking = authorities.filter((val, i) => {
      return val.indexOf(path) != -1;
    });
    if (checking[0]) {
      let action = checking[0].split("-");
      if (action[1]) {
        return action[1];
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
  validateCategory(authorities, category) {
    let checking = authorities.filter((val, i) => {
      return val.indexOf(category) != -1;
    });
    if (checking != null && checking.length > 0) {
      return "PASS";
    } else {
      return ""
    }
  }
  validatePage(page) {
    if (!this.currentUserValue.authorities[page]) {
      this.router.navigate(['/home'], { queryParams: { permission: "error" } });
    }
    return this.currentUserValue.authorities[page];
  }
  logIn(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
