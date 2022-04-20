import { Component, OnInit } from '@angular/core';
import { CommodityService } from 'src/app/commodity/commodity.service';
import { UserService } from '../user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserCommodity } from 'src/app/shared/interfaces/commodity-interfaces/user-commodity';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserChange } from 'src/app/shared/interfaces/user-interfaces/user-change';
import { AuthService } from 'src/app/auth/auth.service';
import { map, Observable, subscribeOn } from 'rxjs';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { ChangeDto } from 'src/app/shared/interfaces/user-interfaces/change-dto';
import { UserCommodityResolved } from 'src/app/shared/interfaces/commodity-interfaces/user-commodity-resolved';

@Component({
  selector: 'app-add-user-asset',
  templateUrl: './add-user-asset.component.html',
  styleUrls: ['./add-user-asset.component.css']
})

export class AddUserAssetComponent implements OnInit {

  changeForm!:FormGroup;
  tickerForm!:FormGroup;
  change!: ChangeDto
  qId: string ='';
  currentUser?:AuthResponseDto | null;
  userCommodity: UserCommodity[] =[];
  showMatch?:Boolean
  commodity?:UserCommodity;

  
  constructor(private formBuilder:FormBuilder, private _authService: AuthService, private _commodityService:CommodityService, private _userService:UserService,private _router:Router, private route:ActivatedRoute) {
  
  }


  ngOnInit(): void { 
   const resolvedData:UserCommodityResolved = this.route.snapshot.data['resolvedCommodity'];
  
   
   this._authService.currentUser.subscribe(resp => this.currentUser = resp);

   this.changeForm=this.formBuilder.group({
    newTotal: ['', [Validators.required]]
  })
    this.tickerForm =this.formBuilder.group({
    ticker: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
  })

   if(resolvedData.userCommodity!= null){

    this.commodity = resolvedData.userCommodity;
    this.tickerForm.setValue({ticker:this.commodity!.stockSymbol});
  }

    this.change={
     changeTime: new Date(),
     changeAmount : -1, 
     totalAmount: -1,
     commodityId: -1,
     userId: ''
     }  

}

tickerSubmit(tickerValue:any){
  const tickerSubmit ={...tickerValue};
  this._commodityService.getCommodityByTicker(tickerSubmit.ticker)
    .subscribe(resp=> {this.userCommodity =resp;
                       this.showMatch=true})  
}

onSubmit(newTotalValue:any){
const newTotal ={...newTotalValue} 
this.change.totalAmount=newTotal.newTotal
this.change.commodityId= this.commodity?.commodityId
this.change.userId=this.currentUser!.id
this.change.changeAmount=newTotal.newTotal


this._userService.postChange(this.change)
.subscribe(resp =>{ this._userService.notifyAboutChange(); 
                    this._router.navigate(['/user-profile'])})
}

addPortfolio(id:any, ){
  this._commodityService.getCommodityById(id).subscribe(resp=> this.commodity=resp)}

}

