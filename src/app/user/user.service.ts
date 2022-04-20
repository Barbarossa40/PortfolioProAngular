import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserChange } from '../shared/interfaces/user-interfaces/user-change';
import { BehaviorSubject, map, observable, Subject, switchMap, tap } from 'rxjs';
import { Coins } from '../shared/interfaces/commodity-interfaces/coins';
import { ChangeDto } from '../shared/interfaces/user-interfaces/change-dto';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../shared/interfaces/auth-interfaces/login-models/auth-dto';
import { AuthResponseDto } from '../shared/interfaces/auth-interfaces/login-models/auth-response-dto';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUriCommodity : string ="https://localhost:7168/api/commodity";
  private apiUriChange : string ="https://localhost:7168/api/user";
  private apiUriCoin : string ="https://localhost:7168/api/coin";
  private apiUriQuote : string ="https://localhost:7168/api/quote";
  private apiUriSearch : string ="https://localhost:7168/api/search";
  private apiUriSymbol : string ="https://localhost:7168/api/symbol";
  private apiUriUser : string ="https://localhost:7168/api/user";
  
 
  eventEmitterNotifier: EventEmitter<null> = new EventEmitter();
  currentUser!:AuthResponseDto | null;

  constructor(private http: HttpClient, _authService:AuthService) {  
    _authService.currentUser.subscribe(resp => this.currentUser = resp);
  }
 
  private readonly tableRefresh = new BehaviorSubject(undefined);
 


  notifyAboutChange() {
    this.eventEmitterNotifier.emit();
  }
   
  getUserCommodities(id:any){
    return this.http.get<UserChange[]>(`${this.apiUriUser}?id=${id}`)
  }
  
  getUserCommodityDetail(userid:string, commId?: number){

    return this.http.get<UserChange[]>(`${this.apiUriUser}/details?userid=${userid}&commid=${commId}`)
                    
  }
  getChangeById(cId: number){

    return this.http.get<UserChange>(`${this.apiUriUser}/change-id?cId=${cId}`)
                    
  }
 
  postChange(change:ChangeDto)
  { 
    return this.http.post<UserChange>(`${this.apiUriChange}`, change)
  
  }

  putChange(change: UserChange)
  {
    this.http.put<UserChange>(`${this.apiUriUser}`, change)
  .subscribe()
  }

  deleteChange(cId: number, id:string)
  {
    this.http.delete(`${this.apiUriUser}?cId=${cId}&id=${id}`)
    .subscribe()


  }

}


// .pipe(tap(_=> this.hasChanged.next(null)))
  // userAssetSearch(ticker:string){
  //   return this.http.get<any>(`${this.apiUriSymbol}?symbol=${ticker}`,{observe:'body'})  
  // }

  // addAsset(newCommodity:UserCommodity){
  //   delete newCommodity.commodityId;
  //   return this.http.post<any>(this.apiUriCommodity,newCommodity, {observe:'body'});    
  // }

  // userCryptoSearch(query:string){
  //   return this.http.get<Coins[]>(`${this.apiUriSearch}/crypto?query=${query}`)

  // }
