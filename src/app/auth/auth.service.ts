import { Injectable } from '@angular/core';
import { AuthDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-dto';
import { RegistrationDto } from 'src/app/shared/interfaces/auth-interfaces/reg-model/registration-dto';
import { RegResponseDto } from 'src/app/shared/interfaces/auth-interfaces/reg-model/reg-response-dto';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap } from 'rxjs/operators'
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private readonly URL = "https://localhost:7168/api/accounts/";


   private currentUserSubject: BehaviorSubject<AuthResponseDto | null>;
    public currentUser: Observable<AuthResponseDto | null>;
   
   constructor(private _http: HttpClient,  public _jwtHelper: JwtHelperService, public _router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthResponseDto|null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthResponseDto | null {    ///example of getter
   return this.currentUserSubject.value;
  }

   public registerUser = (body: RegistrationDto) => {
    return this._http.post<RegResponseDto>(this.URL+"registration", body)
  }

  public loginUser(body: AuthDto){
    return this._http.post<AuthResponseDto>(this.URL+"login", body).
    pipe(map(user => {  localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return user;}))
  }

  public logout = () => {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null)

  }

  // public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
  //   this._authChangeSub.next(isAuthenticated);
  // }

  // public isUserAuthenticated = (): boolean => {
  //   let token: any = localStorage.getItem("token");
  //   if (token &&  !this._jwtHelper.isTokenExpired(token))
  //   {
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
    
  // }

}


