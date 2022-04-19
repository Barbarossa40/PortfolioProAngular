import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommodityListingComponent } from './commodity/commodity-listing/commodity-listing.component';
import { SearchStockComponent } from './commodity/search-stock/search-stock.component';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AddCommodityComponent } from './user/add-commodity/add-commodity.component';
import { AddUserAssetComponent } from './user/add-user-asset/add-user-asset.component';
import { UserModule } from './user/user.module';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user-profile',
    component:UserProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'search-stock',
    component:SearchStockComponent
  },
  {
    path: 'commodity',
    component:CommodityListingComponent
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
 },
  {
    path:'', redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'**', redirectTo:'',
    component: PageNotFoundComponent 
  }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
