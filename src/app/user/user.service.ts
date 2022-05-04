import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserTransaction } from '../shared/interfaces/user-interfaces/user-transaction';
import { BehaviorSubject, map, observable, Subject, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../shared/interfaces/auth-interfaces/login-models/auth-dto';
import { AuthResponseDto } from '../shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { Coins } from '../shared/interfaces/asset-interfaces/coins';
import { TransactionDto } from '../shared/interfaces/user-interfaces/transaction-dto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUriAsset : string ="https://localhost:7168/api/asset";
  private apiUriTransaction : string ="https://localhost:7168/api/user";
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
 


  notifyAboutTransaction() {
    this.eventEmitterNotifier.emit();
  }
   
  getUserAssets(id:any){
    return this.http.get<UserTransaction[]>(`${this.apiUriUser}?id=${id}`)
  }
  
  getUserAssetDetail(userid:string, assetId?: number){

    return this.http.get<UserTransaction[]>(`${this.apiUriUser}/details?userid=${userid}&assetId=${assetId}`)
                    
  }
  getTransactionById(tId: number){

    return this.http.get<UserTransaction>(`${this.apiUriUser}/transaction-id?tId=${tId}`)
                    
  }
 
  postTransaction(transaction:TransactionDto)
  { 
    return this.http.post<UserTransaction>(`${this.apiUriTransaction}`, transaction)
  
  }

  putTransaction(transaction: UserTransaction)
  {
    return this.http.put<UserTransaction>(`${this.apiUriUser}`, transaction)
  
  }

  deleteTransaction(tId: number, id:string)
  {
    return this.http.delete(`${this.apiUriUser}?tId=${tId}&id=${id}`)
    
  }

  getAverage(id:string){
    return this.http.get<number[]>(`${this.apiUriUser}/average?id=${id}`)
  }

}


// .pipe(tap(_=> this.hasTransactiond.next(null)))
  // userAssetSearch(ticker:string){
  //   return this.http.get<any>(`${this.apiUriSymbol}?symbol=${ticker}`,{observe:'body'})  
  // }

  // addAsset(newAsset:UserAsset){
  //   delete newAsset.assetId;
  //   return this.http.post<any>(this.apiUriAsset,newAsset, {observe:'body'});    
  // }

  // userCryptoSearch(query:string){
  //   return this.http.get<Coins[]>(`${this.apiUriSearch}/crypto?query=${query}`)

  // }
