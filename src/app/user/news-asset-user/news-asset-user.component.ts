import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-asset-user',
  templateUrl: './news-asset-user.component.html',
  styleUrls: ['./news-asset-user.component.css']
})
export class NewsAssetUserComponent implements OnInit {

  constructor( private _router:Router, private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this._activatedRoute.snapshot.queryParams.myArray
  }

}
