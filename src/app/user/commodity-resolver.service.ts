import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { CommodityService } from '../commodity/commodity.service';
import { UserCommodityResolved } from '../shared/interfaces/commodity-interfaces/user-commodity-resolved';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommodityResolver implements Resolve<UserCommodityResolved>{

  constructor(private _commodityService:CommodityService, private _userService:UserService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UserCommodityResolved | Observable<UserCommodityResolved> | Promise<UserCommodityResolved> {
    const id= Number(route.paramMap.get('id'))|| -1;
    const symbol = route.paramMap.get('symbol')||'';
    const uuid  = route.paramMap.get('uuid')|| '';
    
    if( id == -1 &&  symbol ==''){
      const message ='blankform'
      return ({userCommodity:null, error: message});
    }
    return this._commodityService.getCommodityById(id, symbol, uuid)
    .pipe(
    map(userCommodity => ({ userCommodity: userCommodity })))
    
    }
  }

    // if(typeof id&&symbol&&uuid =='undefined'){

    //  return this._commodityService.getCommodityById(id, symbol, uuid)
    
    // throw new Error('Method not implemented.');


  

// getCommodityById(id?:number, symbol?:string, uuid?: string){
//   if(typeof id!=='undefined' && typeof uuid =='undefined'){
//   return this.http.get<UserCommodity>(`${this.apiUriCommodity}/${id}`)
//   }
//   else{
//     return this.getNewlyAddedAsset(symbol,uuid)
//   }
// }