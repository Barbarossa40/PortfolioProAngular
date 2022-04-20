
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { asyncScheduler } from 'rxjs/internal/scheduler/async';
import {map} from 'rxjs/operators'
import { AuthService } from 'src/app/auth/auth.service';
import { CommodityService } from 'src/app/commodity/commodity.service';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { CoinPrice } from 'src/app/shared/interfaces/commodity-interfaces/coin-price';
import { UserCommodity } from 'src/app/shared/interfaces/commodity-interfaces/user-commodity';
import { UserCommodityResolved } from 'src/app/shared/interfaces/commodity-interfaces/user-commodity-resolved';

@Component({
  selector: 'app-user-commodity-details',
  templateUrl: './user-commodity-details.component.html',
  styleUrls: ['./user-commodity-details.component.css']
})
export class UserCommodityDetails implements OnInit {


stockDetail:string[] =[]
commodity!:UserCommodity;

  constructor(private route:ActivatedRoute, private _commodityService:CommodityService, private _authService:AuthService) {   
  }

  ngOnInit(): void {
    const resolvedData:UserCommodityResolved = this.route.snapshot.data['resolvedCommodity'];

    this.getCommodityDetails(resolvedData.userCommodity!)/// null check needed here
                                      
  }

  getCommodityDetails(userCommodity:UserCommodity){
    this.commodity=userCommodity;
    if(userCommodity.uuid){
      this._commodityService.getCryptobyUuid(userCommodity.uuid).pipe(map( resp=> Object.entries(resp).map(([key,value])=>`${key}: ${value}` )))
      .subscribe(resp=> this.stockDetail=resp)}  
      else{
        this._commodityService.userAssetSearch(userCommodity.stockSymbol).pipe(map( resp=> Object.entries(resp).map(([key,value])=>`${key}: ${value}` )))
         .subscribe((response) => this.stockDetail = response) }    
        
  }
}

    