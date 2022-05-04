import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AssetService } from '../asset/asset.service';
import { UserAssetResolved } from '../shared/interfaces/asset-interfaces/user-asset-resolved';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AssetResolver implements Resolve<UserAssetResolved>{

  constructor(private _assetService:AssetService, private _userService:UserService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UserAssetResolved | Observable<UserAssetResolved> | Promise<UserAssetResolved> {
    const id= Number(route.paramMap.get('id'))|| -1;
    const symbol = route.paramMap.get('symbol')||'';
    const uuid  = route.paramMap.get('uuid')|| '';
    
    if( id == -1 &&  symbol ==''){
      const message ='blankform'
      return ({userAsset:null, error: message});
    }
    return this._assetService.getAssetById(id, symbol, uuid)
    .pipe(
    map(userAsset => ({ userAsset: userAsset })))
    
    }
  }
