import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { AuthResponseDto } from './shared/interfaces/auth-interfaces/login-models/auth-response-dto';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolioproangular';
  currentUser?:AuthResponseDto | null;
 

  constructor(private _authService: AuthService ){}

  ngOnInit(): void {
  
    this._authService.currentUser.subscribe(x => this.currentUser = x);

    
  }
}
