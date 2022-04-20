import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommodityModule } from './commodity/commodity.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";

import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
   
  
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    AuthModule,
    UserModule,
    CoreModule,
    CommodityModule,
    JwtModule.forRoot({
      config: {
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: [] 
        }
      }
    ),
    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
