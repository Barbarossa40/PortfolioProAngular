import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CommodityService } from 'src/app/commodity/commodity.service';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { CoinPrice } from 'src/app/shared/interfaces/commodity-interfaces/coin-price';
import { UserCommodity } from 'src/app/shared/interfaces/commodity-interfaces/user-commodity';
import { UserCommodityResolved } from 'src/app/shared/interfaces/commodity-interfaces/user-commodity-resolved';
import { ChangeDto } from 'src/app/shared/interfaces/user-interfaces/change-dto';
import { UserChange } from 'src/app/shared/interfaces/user-interfaces/user-change';
import { UserChangesResolved } from 'src/app/shared/interfaces/user-interfaces/user-changes-resolverd';
import { UserService } from '../user.service';

@Component({
  selector: 'app-portfolio-update',
  templateUrl: './portfolio-update.component.html',
  styleUrls: ['./portfolio-update.component.css']
})
export class PortfolioUpdateComponent implements OnInit {

  // currentUser!: AuthResponseDto;
 
  changeHistory: UserChange[] =[];
  updateForm!:FormGroup;
  update!: ChangeDto;
  reveal:boolean=false;
  mostRecent!: UserChange;
  previousChange!:UserChange;
  commodity!:UserCommodity;
  errorMessage!:string| null;
  coinPrice!: CoinPrice|null;
  quoteDetail: any;
  today = new Date().getDate();
  currentUser!:AuthResponseDto|null;
  userName!:string|null;


  constructor(private _authService:AuthService, private _userService:UserService, private route:ActivatedRoute,private _router:Router,
              private formBuilder:FormBuilder, private _commodityService: CommodityService) { 
    
    this._authService.currentUser.subscribe(resp => this.currentUser = resp);

    
    
}

  ngOnInit(): void {
    
    const resolvedChanges:UserChangesResolved = this.route.snapshot.data['resolvedChanges']
 
    this.changeHistory = resolvedChanges.userChangeArray
    
    this.updateForm=this.formBuilder.group({
      updateTotal: ['', [Validators.required]]
    }) 


    if(!this.changeHistory){

      this.errorMessage= "Nothing here yet, brah"
    }
    else{
   
      this.setDetails(this.changeHistory)
    }
  }
  
  setDetails(changeHistory:UserChange[])
  {
   this.mostRecent=changeHistory[0];
   changeHistory.shift();
  //  this.previousChange=changeHistory[1]
  this.userName=this.currentUser!.email.substring(0, this.currentUser!.email.lastIndexOf("@"))

  if(this.mostRecent) {
  console.log(this.mostRecent)
   if(this.mostRecent.commodity!.uuid){

     this._commodityService.getCoinPrice(this.mostRecent.commodity!.uuid)
                           .subscribe({next:resp => this.coinPrice=resp ,
                                      error:() => this.errorMessage=" unknown error"})
                                      console.log(this.coinPrice)
   }
   else{
    this._commodityService.getStockQuote(this.mostRecent.commodity!.stockSymbol)
                          .subscribe({next:resp => this.quoteDetail=resp,
                           error:() => this.errorMessage=" unknown error"})
    }
   }

   //page refresh? window.location.reload();
  }

  onClick=()=>{
    this.reveal=true;
    
  }

  subUpdate(updateFormValue:any){
  
  const total = {...updateFormValue} 
   
  const change:ChangeDto={
    changeTime: new Date(),
    totalAmount:total.updateTotal,
    changeAmount: (total.updateTotal - this.mostRecent.totalAmount),
    commodityId: this.mostRecent.commodityId,
    userId:this.mostRecent.userId
  }
  
  this._userService.postChange(change)
    .subscribe({next:resp =>{this._userService.notifyAboutChange();  this._router.navigate(['/user-profile'])}, 
                error: err=> this.errorMessage="falied to post change. Please, try again",
                complete:()=> this.updateForm.reset()
                    })
  }
}
// this._router.navigate(['/user-profile'])