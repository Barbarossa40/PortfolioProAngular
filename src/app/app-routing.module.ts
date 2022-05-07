import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetListingComponent } from './asset/asset-listing/asset-listing.component';
import { SearchStockComponent } from './asset/search-stock/search-stock.component';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AddAssetComponent } from './user/add-asset/add-asset.component';
import { AddUserAssetComponent } from './user/add-user-asset/add-user-asset.component';
import { UserModule } from './user/user.module';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user-profile',
    canActivate:[AuthGuard],
    data: { preload: false },
    loadChildren: () =>import('./user/user.module').then(m=>m.UserModule)
  },
  {
    path: 'search-stock',
    component:SearchStockComponent
  },
  {
    path: 'asset',
    component:AssetListingComponent
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
