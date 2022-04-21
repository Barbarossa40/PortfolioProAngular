import { Component, OnInit } from '@angular/core';
import { CommodityService } from '../commodity.service';

@Component({
  selector: 'app-commodity-listing',
  templateUrl: './commodity-listing.component.html',
  styleUrls: ['./commodity-listing.component.css']
})
export class CommodityListingComponent implements OnInit {

  symbol: string = "mmm%2caxp%2camgn%2caapl%2cba%2ccat%2ccvx%2ccsco"
    + "%2cdow%2cgs%2chon%2cibm%2cintc%2cjnj%2cjpm%2cmcd%2cmrk%2cmsft"
    + "%2cnke%2cpg"
    
  quoteDetails: any;
  crypto: any;
  today=new Date();

  constructor(private repo : CommodityService) { } 

  ngOnInit(): void {
    this.repo.getStockQuote(this.symbol).subscribe(
      (response) => {this.quoteDetails = response}
    );

    this.repo.getFiftyCoins().subscribe( resp=>
      this.crypto= resp)
  

  }

}
