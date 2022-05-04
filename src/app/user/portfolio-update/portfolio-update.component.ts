import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AssetService } from 'src/app/asset/asset.service';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { CoinPrice } from 'src/app/shared/interfaces/asset-interfaces/coin-price';
import { UserAsset } from 'src/app/shared/interfaces/asset-interfaces/user-asset';
import { UserAssetResolved } from 'src/app/shared/interfaces/asset-interfaces/user-asset-resolved';
import { TransactionDto } from 'src/app/shared/interfaces/user-interfaces/transaction-dto';
import { UserTransaction } from 'src/app/shared/interfaces/user-interfaces/user-transaction';
import { UserTransactionsResolved } from 'src/app/shared/interfaces/user-interfaces/user-transactions-resolved';
import { UserService } from '../user.service';

@Component({
  selector: 'app-portfolio-update',
  templateUrl: './portfolio-update.component.html',
  styleUrls: ['./portfolio-update.component.css']
})
export class PortfolioUpdateComponent implements OnInit {

  // currentUser!: AuthResponseDto;
 
  transactionHistory: UserTransaction[] =[];
  updateForm!:FormGroup;
  update!: TransactionDto;
  reveal:boolean=false;
  mostRecent!: UserTransaction;
  asset!:UserAsset;
  errorMessage!:string| null;
  coinPrice!: CoinPrice|null;
  quoteDetail: any;
  today = new Date().getDate();
  currentUser!:AuthResponseDto|null;
  userName!:string|null;


  constructor(private _authService:AuthService, private _userService:UserService, private route:ActivatedRoute,private _router:Router,
              private formBuilder:FormBuilder, private _assetService: AssetService) { 
    
    this._authService.currentUser.subscribe(resp => this.currentUser = resp);

    
    
}

  ngOnInit(): void {
    
   
    this.transactionHistory  = this.route.snapshot.data['resolvedTransactions'].userTransactionArray

   
    
    this.updateForm=this.formBuilder.group({
      updateTotal: ['', [Validators.required]]
    }) 


    if(!this.transactionHistory){

      this.errorMessage= "Nothing here yet, brah"
    }
    else{
   
      this.setDetails(this.transactionHistory)
    }
  }
  
  setDetails(transactionHistory:UserTransaction[])
  {
   this.mostRecent=transactionHistory[0];
  //  transactionHistory.shift();
  //  this.previousTransaction=transactionHistory[1]
  this.userName=this.currentUser!.email.substring(0, this.currentUser!.email.lastIndexOf("@"))

  if(this.mostRecent) {
  console.log(this.mostRecent)
   if(this.mostRecent.asset!.uuid){

     this._assetService.getCoinPrice(this.mostRecent.asset!.uuid)
                           .subscribe({next:resp => this.coinPrice=resp ,
                                      error:() => this.errorMessage=" unknown error"})
                                      console.log(this.coinPrice)
   }
   else{
    this._assetService.getStockQuote(this.mostRecent.asset!.stockSymbol)
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
   
  const transaction:TransactionDto={
    transactionTime: new Date(),
    totalAmount:total.updateTotal,
    transactionAmount: (total.updateTotal - this.mostRecent.totalAmount),
    assetId: this.mostRecent.assetId,
    userId:this.mostRecent.userId,
    priceSnapshot:this.mostRecent.priceSnapshot
  }
  
  this._userService.postTransaction(transaction)
    .subscribe({next:resp =>{this._userService.notifyAboutTransaction();  this._router.navigate(['/user-profile'])}, 
                error: err=> this.errorMessage="falied to post transaction. Please, try again",
                complete:()=> this.updateForm.reset()
                    })
  }

  deleteInput(transactionId:number){
    this._userService.deleteTransaction(transactionId,this.currentUser?.id!).subscribe({next:resp =>{this._userService.notifyAboutTransaction();}, 
                                                 error: err=> this.errorMessage="falied to post transaction. Please, try again",
                                                 complete:()=> window.location.reload()})
  }

  addTransaction(){
    
  }
}




// <button class="btn btn-outline-warning"
//                     style="width:80px"
//                     type="button"
//                     (click)="deleteInput(mostRecent.transactionId!)">Delete</button>
// this._router.navigate(['/user-profile'])
