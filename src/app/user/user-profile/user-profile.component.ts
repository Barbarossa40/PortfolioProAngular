import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { UserChange } from '../../shared/interfaces/user-interfaces/user-change';
import { CommodityService } from 'src/app/commodity/commodity.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userName = '';
  commodities: UserChange[] =[];
  currentUser: AuthResponseDto | null = new AuthResponseDto;
  message:string=''
  

  constructor(public _authService :AuthService, private _userService:UserService, private _router:Router ) { }
  ngOnInit(): void {
    this._authService.currentUser.subscribe(resp => this.currentUser = resp);
    
    if(this.currentUser==null){
      this.message='not allowed, bye felicia'
      this._router.navigate(['auth/login'])
    }else{
      this.getUserCommodities(this.currentUser.id)
      this.userName=this.currentUser.email.substring(0, this.currentUser.email.lastIndexOf("@"))
    } 

}

private getUserCommodities(id:any){

  this._userService.getUserCommodities(id)
    .subscribe(stonks => this.commodities=stonks)
}


}