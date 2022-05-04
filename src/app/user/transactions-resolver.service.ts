import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AssetService } from '../asset/asset.service';
import { UserTransactionsResolved } from '../shared/interfaces/user-interfaces/user-transactions-resolved';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsResolver implements Resolve<UserTransactionsResolved>{

  constructor(private _assetService:AssetService, private _userService:UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UserTransactionsResolved | Observable<UserTransactionsResolved> | Promise<UserTransactionsResolved> {
 
    const id= Number(route.paramMap.get('id'));
    const uid = route.paramMap.get('uid');
     return this._userService.getUserAssetDetail(uid!,id)
     .pipe(
      map(res =>({userTransactionArray : res})))     
                      
  }
}
// return this._assetService.getAssetById(id, symbol, uuid)
// .pipe(
//   map(userAsset => ({ userAsset: userAsset })))
