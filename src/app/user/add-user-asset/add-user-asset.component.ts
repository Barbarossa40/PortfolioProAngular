import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/asset/asset.service';
import { UserService } from '../user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserAsset } from 'src/app/shared/interfaces/asset-interfaces/user-asset';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserTransaction } from 'src/app/shared/interfaces/user-interfaces/user-transaction';
import { AuthService } from 'src/app/auth/auth.service';
import { map, Observable, subscribeOn } from 'rxjs';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { TransactionDto } from 'src/app/shared/interfaces/user-interfaces/transaction-dto';
import { UserAssetResolved } from 'src/app/shared/interfaces/asset-interfaces/user-asset-resolved';
import { StockDetails } from 'src/app/shared/interfaces/asset-interfaces/stock-details';

@Component({
  selector: 'app-add-user-asset',
  templateUrl: './add-user-asset.component.html',
  styleUrls: ['./add-user-asset.component.css']
})

export class AddUserAssetComponent implements OnInit {

  transactionForm!:FormGroup;
  tickerForm!:FormGroup;
  transaction!: TransactionDto
  qId: string ='';
  currentUser?:AuthResponseDto | null;
  userAsset: UserAsset[] =[];
  showMatch?:Boolean
  asset?:UserAsset;
  stockDetail!: StockDetails | undefined
 

  
  constructor(private formBuilder:FormBuilder, private _authService: AuthService, private _assetService:AssetService, private _userService:UserService,private _router:Router, private route:ActivatedRoute) {
  
  }


  ngOnInit(): void { 
  this.route.data.subscribe(data =>this.asset=data['resolvedAsset'].userAsset);
   this._authService.currentUser.subscribe(resp => this.currentUser = resp);

    this.transactionForm=this.formBuilder.group({
    newTotal: ['', [Validators.required]]})

    this.tickerForm =this.formBuilder.group({
    ticker: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]], })

    this.transaction={
     transactionTime: new Date(),
     transactionAmount : -1, 
     totalAmount: -1,
     assetId: -1,
     userId: '',
     priceSnapshot: -1
     } 
     this._assetService.getStockQuote(this.asset!.stockSymbol)
     .subscribe({next: resp=> this.transaction.priceSnapshot = resp.last})    
     
}

tickerSubmit(tickerValue:any){ 
  const tickerSubmit ={...tickerValue};
  this._assetService.getAssetByTicker(tickerSubmit.ticker)
    .subscribe(resp=> {this.userAsset =resp;
                       this.showMatch=true})  
}

onSubmit(newTotalValue:any){
const newTotal ={...newTotalValue} 
this.transaction.totalAmount=newTotal.newTotal
this.transaction.assetId= this.asset?.assetId
this.transaction.userId=this.currentUser!.id
this.transaction.transactionAmount=(newTotal.newTotal)


this._userService.postTransaction(this.transaction)
.subscribe(resp =>{ this._userService.notifyAboutTransaction(); 
                    this._router.navigate(['/user-profile'])})
}

addPortfolio(id:any, ){
  this._assetService.getAssetById(id).subscribe(resp=> this.asset=resp)}

}

