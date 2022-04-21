import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CommodityService } from '../../commodity/commodity.service';
import { FormGroup, FormsModule, NgForm, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserCommodity } from '../../shared/interfaces/commodity-interfaces/user-commodity';
import { StockDetails } from '../../shared/interfaces/commodity-interfaces/stock-details';
import { map, tap, throwError } from 'rxjs';
import { Coins } from '../../shared/interfaces/commodity-interfaces/coins';
import { UserChange } from 'src/app/shared/interfaces/user-interfaces/user-change';
import { UserService } from '../user.service';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';

@Component({
  
  templateUrl: './add-commodity.component.html',
  styleUrls: ['./add-commodity.component.css']
})
export class AddCommodityComponent implements OnInit {
 
 sortForm!:FormGroup;
 submitted = false;
 isCryptoSearch = false;
 isStockSearch = false;
 doAddToPortfolio=false;

 currentUser?: AuthResponseDto | null


 commodity!:UserCommodity ;
 message:any ='';
 stockDetail!: StockDetails
 crypto!:Coins[]

 errorMessage!:string | null;

 badSearch:string=''

  change!:UserChange

  constructor(public _commodityService:CommodityService,private _authService: AuthService,public _userService:UserService, private router: Router, private route: ActivatedRoute) 
  {
    this._authService.currentUser.subscribe(resp => this.currentUser = resp);

  }

  ngOnInit(): void { 
   
     this.sortForm = new FormGroup({
      tickerSymbol: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(6)]),
      assetClass: new FormControl("", [Validators.required])
    })

     this.commodity={
       commodityId: 0,
       commodityName: '',
       stockSymbol:'',
       type:'',
       uuid: '', 
     }
     
  }

  onSubmit(sortFormValue:any){
    const form = {...sortFormValue };
    this.commodity.type =form.assetClass
    this.commodity.stockSymbol = form.tickerSymbol.toUpperCase().trim();

    this.badSearch=form.tickerSymbol.toUpperCase();
    this.assetSearch(this.commodity)
    
  }

  assetSearch(assetAdd:UserCommodity){
  
  if(assetAdd.type =='Stock')
   {this.isStockSearch=true;
    this.isCryptoSearch=false;

    this._commodityService.userAssetSearch(this.commodity.stockSymbol)
      .pipe(map((resp)=> this.stockDetail= resp))
       .subscribe({next: resp => {this.commodity.commodityName = resp.companyName;  console.log(resp);
                                  this.errorMessage=null},
                  error:_=> this.errorMessage=`We couldn't find a company associated with ${this.badSearch}.  Use the search function below to help locate what you're after` ,
                  complete:()=> this.sortForm.reset()})}
                
      if(assetAdd.type=="Crypto"){
        this.isCryptoSearch=true;
        this.isStockSearch=false;

          console.log(this.isCryptoSearch)
        this._commodityService.userCryptoSearch(this.commodity.stockSymbol)
        .subscribe({next: resp => {this.crypto = resp;  console.log(resp);
                                  this.errorMessage=null},
                                  error:_=> this.errorMessage=`We couldn't find a company associated with ${this.badSearch}.  Use the search function below to help locate what you're after` ,
                                  complete:()=> this.sortForm.reset()})}
    } 
    
  addCrypto(name:string, symbol:string, uuid:string){
   this.commodity.commodityName = name
   this.commodity.stockSymbol = symbol
   this.commodity.uuid= uuid

    this._commodityService.addAsset(this.commodity)
    .subscribe({next: resp => {this.doAddToPortfolio = true;
                              this.errorMessage=null},
                 error: err=>this.errorMessage= `We already track ${this.commodity.commodityName}: ${this.commodity.stockSymbol}. Please check again! `})
  
  }

  addStock(){
    this._commodityService.addAsset(this.commodity)
    .subscribe({next: resp => {this.doAddToPortfolio = true,
                               this.errorMessage=''},
      error: err=>this.errorMessage= `We already track ${this.commodity.commodityName}: ${this.commodity.stockSymbol}. Please check again! `})
    }
}