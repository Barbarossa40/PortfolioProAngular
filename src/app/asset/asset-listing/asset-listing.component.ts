import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset-listing',
  templateUrl: './asset-listing.component.html',
  styleUrls: ['./asset-listing.component.css']
})
export class AssetListingComponent implements OnInit {

  symbol: string = "mmm%2caxp%2camgn%2caapl%2cba%2ccat%2ccvx%2ccsco"
    + "%2cdow%2cgs%2chon%2cibm%2cintc%2cjnj%2cjpm%2cmcd%2cmrk%2cmsft"
    + "%2cnke%2cpg"
    
  quoteDetails: any;
  crypto: any;
  today=new Date();

  constructor(private repo : AssetService) { } 

  ngOnInit(): void {
    this.repo.getStockQuote(this.symbol).subscribe(
      (response) => {this.quoteDetails = response}
    );

    this.repo.getFiftyCoins().subscribe( resp=>
      this.crypto= resp)
  

  }

}
