import { HttpClient,HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAsset } from '../shared/interfaces/asset-interfaces/user-asset';
import { Coins } from '../shared/interfaces/asset-interfaces/coins';
import { BehaviorSubject, map, Subject, switchMap } from 'rxjs';
import { CoinPrice } from '../shared/interfaces/asset-interfaces/coin-price';


@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private apiUriAsset : string ="https://localhost:7168/api/asset";
  private apiUriTransaction : string ="https://localhost:7168/api/transaction";
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
    return this.http.get<any>(`${this.apiUri}/Quote?symbols=${symbol}`,{observe:'body'}) 
  }
  getCryptobyUuid(uuid:any){
    return this.http.get<any>(`${this.apiUriCoin}/uuid?uuid=${uuid}`,{observe:'body'})
  }
  // .pipe(map((resp)=>{JSON.parse(JSON.stringify(resp))}))
  userAssetSearch(ticker:string){
    return this.http.get<any>(`${this.apiUriSymbol}?symbol=${ticker}`,{observe:'body'})  
  }

  addAsset(newAsset:UserAsset){
    delete newAsset.assetId;
    return this.http.post<any>(this.apiUriAsset,newAsset, {observe:'body'});    
  }

  userCryptoSearch(query:string){
    return this.http.get<Coins[]>(`${this.apiUriSearch}/crypto?query=${query}`)
  }




  getAssetById(id?:number, symbol?:string, uuid?: string){
  
   console.log(id)
   console.log(symbol)

  if( id!== -1 || null &&  symbol ==''|| undefined){
    console.log(id)
    return this.http.get<UserAsset>(`${this.apiUriAsset}/${id}`)
  }
  else{
      return this.getNewlyAddedAsset(symbol,uuid)
    }
  }


  getNewlyAddedAsset(symbol?:string, uuid?:string){
   
    console.log(uuid)
    if(uuid != '' ||null){

      return this.http.get<UserAsset>(`${this.apiUriAsset}/new?symbol=${symbol}&uuid=${uuid}`)
    }
    else{
     console.log(symbol)
     
      return this.http.get<UserAsset>(`${this.apiUriAsset}/new?symbol=${symbol}`)
    }
  }

  getAssetByTicker(ticker:string){
    return this.http.get<UserAsset[]>(`${this.apiUriAsset}/ticker?ticker=${ticker}`)
  }

  getCoinPrice(coinUuid: string){

    return this.http.get<CoinPrice>(`${this.apiUriCoin}/price?coinUuid=${coinUuid}`)
    
  }

  getStockPrice(symbol: string){

    return this.http.get<CoinPrice>(`${this.apiUriCoin}/price?coinUuid=${symbol}`)
    
  }
}
