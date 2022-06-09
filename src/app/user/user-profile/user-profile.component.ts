import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { UserTransaction } from '../../shared/interfaces/user-interfaces/user-transaction';
import { AssetService } from 'src/app/asset/asset.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userName = '';
  assets: UserTransaction[] =[];
  currentUser: AuthResponseDto | null = new AuthResponseDto;
  message:string=''
  today=new Date();
  average!: number[];
  symbolArray: string []=[];
  

  constructor(public _authService :AuthService, private _userService:UserService, private _router:Router ) { }
  ngOnInit(): void {
    this._authService.currentUser.subscribe(resp => this.currentUser = resp);
    
    if(this.currentUser==null){
      this.message='not allowed, bye felicia'
      this._router.navigate(['auth/login'])
    }else{
      this.getUserAssets(this.currentUser.id)
      this.userName=this.currentUser.email.substring(0, this.currentUser.email.lastIndexOf("@"))
    } 

    this.getAverage(this.currentUser?.id)
    console.log(this.average)

    this.assets.forEach( (symbol) =>{
      this.symbolArray.push(symbol.asset!.stockSymbol)
    console.log(this.symbolArray)
   
     });
    
}

getPortfolioNews(): void {
  this._router.navigate(["portfolioi-news"], {
    queryParams: { myArray: this.symbolArray },
    });
 
}
private getUserAssets(id:any){

  this._userService.getUserAssets(id)
    .subscribe({next: stonks => this.assets=stonks,
                complete:() => console.log(this.assets)})
}

private getAverage(id: any){
this._userService.getAverage(id)
      .subscribe({next: avg=> this.average= avg, 
                 complete: () =>  console.log(this.average)})
     
}

}
