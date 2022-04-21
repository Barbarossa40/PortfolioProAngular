import { HttpClient,HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCommodity } from '../shared/interfaces/commodity-interfaces/user-commodity';
import { Coins } from '../shared/interfaces/commodity-interfaces/coins';
import { BehaviorSubject, map, Subject, switchMap } from 'rxjs';
import { CoinPrice } from '../shared/interfaces/commodity-interfaces/coin-price';


@Injectable({
  providedIn: 'root'
})
export class CommodityService {

  private apiUriCommodity : string ="https://localhost:7168/api/commodity";
  private apiUriChange : string ="https://localhost:7168/api/change";
  private apiUriCoin : string ="https://localhost:7168/api/coin";
  private apiUriQuote : string ="https://localhost:7168/api/quote";
  private apiUriSearch : string ="https://localhost:7168/api/search";
  private apiUriSymbol : string ="https://localhost:7168/api/symbol";
  private apiUriUser : string ="https://localhost:7168/api/user";
  private apiUri:string = "https://localhost:7168/api";




  constructor(private http: HttpClient) { }

 getFiftyCoins(){
   return this.http.get( this.apiUriCoin )
 }

  getSearchResult(search: string, type: string) {
    console.log(`${this.apiUri}/Search?search=${search}&type=${type}`);
    return this.http.get(`${this.apiUri}/Search?search=${search}&type=${type}`);
  }

  getStockQuote(symbol: string) {
    console.log(`${this.apiUri}/Quote?symbols=${symbol}`);
    return this.http.get(`${this.apiUri}/Quote?symbols=${symbol}`);
  }
  getCryptobyUuid(uuid:any){
    return this.http.get<any>(`${this.apiUriCoin}/uuid?uuid=${uuid}`,{observe:'body'})
  }
  // .pipe(map((resp)=>{JSON.parse(JSON.stringify(resp))}))
  userAssetSearch(ticker:string){
    return this.http.get<any>(`${this.apiUriSymbol}?symbol=${ticker}`,{observe:'body'})  
  }

  addAsset(newCommodity:UserCommodity){
    delete newCommodity.commodityId;
    return this.http.post<any>(this.apiUriCommodity,newCommodity, {observe:'body'});    
  }

  userCryptoSearch(query:string){
    return this.http.get<Coins[]>(`${this.apiUriSearch}/crypto?query=${query}`)
  }




  getCommodityById(id?:number, symbol?:string, uuid?: string){
  
   console.log(id)
   console.log(symbol)

  if( id!== -1 || null &&  symbol ==''|| undefined){
    console.log(id)
    return this.http.get<UserCommodity>(`${this.apiUriCommodity}/${id}`)
  }
  else{
      return this.getNewlyAddedAsset(symbol,uuid)
    }
  }


  getNewlyAddedAsset(symbol?:string, uuid?:string){
   
    console.log(uuid)
    if(uuid !== ''){

      return this.http.get<UserCommodity>(`${this.apiUriCommodity}/new?symbol=${symbol}&uuid=${uuid}`)
    }
    else{
     console.log(symbol)
     
      return this.http.get<UserCommodity>(`${this.apiUriCommodity}/new?symbol=${symbol}`)
    }
  }

  getCommodityByTicker(ticker:string){
    return this.http.get<UserCommodity[]>(`${this.apiUriCommodity}/ticker?ticker=${ticker}`)
  }

  getCoinPrice(coinUuid: string){

    return this.http.get<CoinPrice>(`${this.apiUriCoin}/price?coinUuid=${coinUuid}`)
    
  }
}
