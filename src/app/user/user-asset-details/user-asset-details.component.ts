
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { asyncScheduler } from 'rxjs/internal/scheduler/async';
import {map} from 'rxjs/operators'
import { AuthService } from 'src/app/auth/auth.service';
import { AssetService } from 'src/app/asset/asset.service';
import { AuthResponseDto } from 'src/app/shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { CoinPrice } from 'src/app/shared/interfaces/asset-interfaces/coin-price';
import { UserAsset } from 'src/app/shared/interfaces/asset-interfaces/user-asset';
import { UserAssetResolved } from 'src/app/shared/interfaces/asset-interfaces/user-asset-resolved';


@Component({
  selector: 'app-user-asset-details',
  templateUrl: './user-asset-details.component.html',
  styleUrls: ['./user-asset-details.component.css']
})
export class UserAssetDetails implements OnInit {


stockDetail:string[] =[]
asset!:UserAsset;

  constructor(private route:ActivatedRoute, private _assetService:AssetService, private _authService:AuthService) {   
  }

  ngOnInit(): void {
    const resolvedData:UserAssetResolved = this.route.snapshot.data['resolvedAsset'];

    this.getAssetDetails(resolvedData.userAsset!)/// null check needed here
                                      
  }

  getAssetDetails(userAsset:UserAsset){
    this.asset=userAsset;
    if(userAsset.uuid){
      this._assetService.getCryptobyUuid(userAsset.uuid).pipe(map( resp=> Object.entries(resp).map(([key,value])=>`${key}: ${value}` )))
      .subscribe(resp=> this.stockDetail=resp)}  
      else{
        this._assetService.userAssetSearch(userAsset.stockSymbol).pipe(map( resp=> Object.entries(resp).map(([key,value])=>`${key}: ${value}` )))
         .subscribe((response) => this.stockDetail = response) }    
        
  }
}

