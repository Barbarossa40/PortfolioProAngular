import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserAssetComponent } from './add-user-asset/add-user-asset.component';
import { AssetModule } from '../asset/asset.module';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { UserAssetDetails } from './user-asset-details/user-asset-details.component';
import { PortfolioUpdateComponent } from './portfolio-update/portfolio-update.component';
import { AssetResolver } from './asset-resolver.service';

import { TransactionsResolver } from './transactions-resolver.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AlterTransactionComponent } from './alter-transaction/alter-transaction.component';
import { UserAddTransactionComponent } from './user-add-transaction/user-add-transaction.component';
import { NewsAssetUserComponent } from './news-asset-user/news-asset-user.component';




@NgModule({
  declarations: [
    UserProfileComponent,
    AddAssetComponent,
    AddUserAssetComponent,
    UserAssetDetails,
    PortfolioUpdateComponent,
    AlterTransactionComponent,
    UserAddTransactionComponent,
    NewsAssetUserComponent,
  ],
  imports: [

    CommonModule,
    AssetModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate:[AuthGuard],
        component:UserProfileComponent,
      },
    {
    path: ':id/details',
     component: UserAssetDetails,
     resolve:{resolvedAsset: AssetResolver}
    },
    {
      path: ':id/update/:uid',  
      component: PortfolioUpdateComponent,
      resolve:{resolvedTransactions: TransactionsResolver,},
      children: [
        {path: '', redirectTo: 'update', pathMatch: 'full' },
        {path:'add-transaction', component: UserAddTransactionComponent},
        {path:'alter/:tid', component: AlterTransactionComponent},
        ]
      },
    {
    path: 'add-asset',
    component: AddAssetComponent,
    resolve:{resolvedAsset: AssetResolver}
    },
    {
    path: 'portfolio-add',
    component: AddUserAssetComponent,
    resolve:{resolvedAsset: AssetResolver}
    },
    {
      path: 'portfolio-news',
      component: NewsAssetUserComponent,
      resolve:{resolvedAsset: AssetResolver}
    } 
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class UserModule { }
