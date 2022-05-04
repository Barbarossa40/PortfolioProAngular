import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetListingComponent } from './asset-listing/asset-listing.component';
import { SearchStockComponent } from './search-stock/search-stock.component';
import { CoinComponent } from './coin/coin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';




@NgModule({
  declarations: [
    AssetListingComponent,
    SearchStockComponent,
    CoinComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    AssetListingComponent,
    SearchStockComponent,
    CoinComponent,
  ],
})
export class AssetModule{}
