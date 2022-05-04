import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AssetService } from '../../asset/asset.service';
import { FormGroup, FormsModule, NgForm, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserAsset } from 'src/app/shared/interfaces/asset-interfaces/user-asset';
import { map, tap, throwError } from 'rxjs';
import { Coins } from 'src/app/shared/interfaces/asset-interfaces/coins';
import { UserTransaction } from 'src/app/shared/interfaces/user-interfaces/user-transaction';
import { UserService } from '../user.service';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { StockDetails } from 'src/app/shared/interfaces/asset-interfaces/stock-details';

@Component({
  
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
 
 sortForm!:FormGroup;
 submitted = false;
 isCryptoSearch = false;
 isStockSearch = false;
 doAddToPortfolio=false;

 currentUser?: AuthResponseDto | null


 asset!:UserAsset ;
 message:any ='';
 stockDetail!: StockDetails
 crypto!:Coins[]

 errorMessage!:string | null;

 badSearch:string=''

  transaction!:UserTransaction

  constructor(public _assetService:AssetService,private _authService: AuthService,public _userService:UserService, private router: Router, private route: ActivatedRoute) 
  {
    this._authService.currentUser.subscribe(resp => this.currentUser = resp);

  }

  ngOnInit(): void { 
   
     this.sortForm = new FormGroup({
      tickerSymbol: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(6)]),
      assetClass: new FormControl("", [Validators.required])
    })

     this.asset={
       assetId: 0,
       assetName: '',
       stockSymbol:'',
       type:'',
       uuid: '', 
     }
     
  }

  onSubmit(sortFormValue:any){
    const form = {...sortFormValue };
    this.asset.type =form.assetClass
    this.asset.stockSymbol = form.tickerSymbol.toUpperCase().trim();

    this.badSearch=form.tickerSymbol.toUpperCase();
    this.assetSearch(this.asset)
    
  }

  assetSearch(assetAdd:UserAsset){
  
  if(assetAdd.type =='Stock')
   {this.isStockSearch=true;
    this.isCryptoSearch=false;

    this._assetService.userAssetSearch(this.asset.stockSymbol)
      .pipe(map((resp)=> this.stockDetail= resp))
       .subscribe({next: resp => {this.asset.assetName = resp.companyName;  console.log(resp);
                                  this.errorMessage=null},
                  error:_=> this.errorMessage=`We couldn't find a company associated with ${this.badSearch}.  Use the search function below to help locate what you're after` ,
                  complete:()=> this.sortForm.reset()})}
                
      if(assetAdd.type=="Crypto"){
        this.isCryptoSearch=true;
        this.isStockSearch=false;

          console.log(this.isCryptoSearch)
        this._assetService.userCryptoSearch(this.asset.stockSymbol)
        .subscribe({next: resp => {this.crypto = resp;  console.log(resp);
                                  this.errorMessage=null},
                                  error:_=> this.errorMessage=`We couldn't find a company associated with ${this.badSearch}.  Use the search function below to help locate what you're after` ,
                                  complete:()=> this.sortForm.reset()})}
    } 
    
  addCrypto(name:string, symbol:string, uuid:string){
   this.asset.assetName = name
   this.asset.stockSymbol = symbol
   this.asset.uuid= uuid

    this._assetService.addAsset(this.asset)
    .subscribe({next: resp => {this.doAddToPortfolio = true;
                              this.errorMessage=null},
                 error: err=>this.errorMessage= `We already track ${this.asset.assetName}: ${this.asset.stockSymbol}. Please check again! `})
  
  }

  addStock(){
    this._assetService.addAsset(this.asset)
    .subscribe({next: resp => {this.doAddToPortfolio = true,
                               this.errorMessage=''},
      error: err=>this.errorMessage= `We already track ${this.asset.assetName}: ${this.asset.stockSymbol}. Please check again! `})
    }
}
