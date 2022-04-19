import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AuthResponseDto } from '../shared/interfaces/auth-interfaces/login-models/auth-response-dto';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  currentUser?:AuthResponseDto;
  userName:any;
  isUserAuthenticated:boolean =false

  imageHome = 'assets/images/home.png'
  imageSearch = 'assets/images/magnifier.png'
  imageLogin = 'assets/images/log-in.png'
  imageRegister = 'assets/images/edit.png'
  imageProfile ='/assets/images/profile3.png'

  constructor(private _authService: AuthService, private _router: Router) { 
    this._authService.currentUser.subscribe(resp => this.currentUser = resp);
    
  }

  ngOnInit(): void {


    if(this.currentUser?.isAuthenticated){
    this.userName=this.currentUser?.email.substring(0, this.currentUser?.email.lastIndexOf("@"))
    }

  }

  public logout = () => {
    this._authService.logout();
    this._router.navigateByUrl('/home');
  }

}