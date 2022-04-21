import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserAssetComponent } from './add-user-asset/add-user-asset.component';
import { CommodityModule } from '../commodity/commodity.module';
import { AddCommodityComponent } from './add-commodity/add-commodity.component';
import { UserCommodityDetails } from './user-commodity-details/user-commodity-details.component';
import { PortfolioUpdateComponent } from './portfolio-update/portfolio-update.component';
import { CommodityResolver } from './commodity-resolver.service';

import { ChangesResolver } from './changes-resolver.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AlterChangeComponent } from './alter-change/alter-change.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    AddCommodityComponent,
    AddUserAssetComponent,
    UserCommodityDetails,
    PortfolioUpdateComponent,
    AlterChangeComponent,
  ],
  imports: [

    CommonModule,
    CommodityModule,
    RouterModule.forChild([
    {
    path: 'user-profile/:id/details',
     component: UserCommodityDetails,
     resolve:{resolvedCommodity: CommodityResolver}
    },
    {
      path: 'user-profile/:id/update/:uid',  
      component: PortfolioUpdateComponent,
      resolve:{resolvedChanges: ChangesResolver,},
      children: [
        {path: '', redirectTo: 'update', pathMatch: 'full' },
        {path:'alter/:cid', component: AlterChangeComponent
       },
        ]
      },
    {
    path: 'add-commodity',
    component: AddCommodityComponent,
    resolve:{resolvedCommodity: CommodityResolver}
    },
    {
    path: 'portfolio-add',
    component: AddUserAssetComponent,
    resolve:{resolvedCommodity: CommodityResolver,
             resolvedChanges: ChangesResolver}
    } 
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class UserModule { }
