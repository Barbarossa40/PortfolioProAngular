import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AssetService } from 'src/app/asset/asset.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserAsset } from 'src/app/shared/interfaces/asset-interfaces/user-asset';
import { UserAssetResolved } from 'src/app/shared/interfaces/asset-interfaces/user-asset-resolved';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { TransactionDto } from 'src/app/shared/interfaces/user-interfaces/transaction-dto';
import { UserTransaction } from 'src/app/shared/interfaces/user-interfaces/user-transaction';
import { UserTransactionsResolved } from 'src/app/shared/interfaces/user-interfaces/user-transactions-resolved';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-add-transaction',
  templateUrl: './user-add-transaction.component.html',
  styleUrls: ['./user-add-transaction.component.css'],
})
export class UserAddTransactionComponent implements OnInit {

  
  lastTrans!:UserTransaction;
  objPairArray!: Map<string, string>;
  currentUser!:AuthResponseDto|null;
  transactionForm!:FormGroup;
  transaction!: TransactionDto


  badSearch:string=''
  
  constructor(private _authService:AuthService, private _userService:UserService, private route:ActivatedRoute,private _router:Router,
    private formBuilder:FormBuilder, private _assetService: AssetService) { }

  ngOnInit(): void {
    this._authService.currentUser.subscribe(resp => this.currentUser = resp);

    this.transaction={
      transactionTime: new Date(),
      transactionAmount : -.69, 
      totalAmount: -.1,
      assetId: -1,
      userId: '',
      priceSnapshot: -1
      } 

    // this.route.parent?.data.subscribe(data=>{
    //   this.transArray= data['resolvedTransactions'].userTransactionArray;
    // })
     this.lastTrans= this.route.parent?.snapshot.data['resolvedTransactions'].userTransactionArray[0]
  
    
    this.transactionForm=this.formBuilder.group({
      newTotal: ['', [Validators.required]]})
      console.log(this.lastTrans) 

        if(this.lastTrans?.asset?.uuid !== ''|| null){
           console.log(this.lastTrans?.asset?.uuid)
          this._assetService.getCoinPrice(this.lastTrans.asset!.uuid!).subscribe({next: resp=> this.transaction.priceSnapshot = +resp.price})
        }
        else{
          console.log(this.lastTrans?.asset?.stockSymbol)
          this._assetService.getStockQuote(this.lastTrans!.asset!.stockSymbol)
          .subscribe({next: response => this.transaction.priceSnapshot= response[0].attributes.last})
        }
      }
       



    onSubmit(newTotalValue:any){
      const newTotal ={...newTotalValue} 
      this.transaction.totalAmount=newTotal.newTotal
      this.transaction.assetId= this.lastTrans?.asset?.assetId
      this.transaction.userId=this.currentUser!.id
      this.transaction.transactionAmount=(newTotal.newTotal-this.lastTrans.totalAmount!)
      
      this._userService.postTransaction(this.transaction)
                  .subscribe(resp =>{ this._userService.notifyAboutTransaction(); 
                    this._router.navigate(['/user-profile'])})

  }

}
//.pipe(map( resp=> Object.entries(resp).map(([key,value])=>`${key}: ${value}` )))
//       .subscribe(resp=> this.stockDetail=resp)}