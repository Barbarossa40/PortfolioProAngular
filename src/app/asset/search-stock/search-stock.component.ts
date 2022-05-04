import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RepositoryService } from 'src/app/repository.service';
import { AssetService } from '../asset.service';
import { Search } from './search.model';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent implements OnInit {
  @ViewChild('searchForm') searchForm : NgForm | undefined;
  
  types: string[] = ['people', 'symbols', 'pages'];
  defaultType = "symbols"
  searchDetails: any;
  symbols: any;
  submitted = false;
  search = new Search('', '');

  constructor(private repo : AssetService) { } 

  onSubmit() {
    this.repo.getSearchResult(this.search.search, this.search.type).subscribe(
      (response) => {this.searchDetails = response}
    );
    this.submitted = true;
    this.search.search = this.searchForm?.value.search;
    this.search.type = this.searchForm?.value.type;
  }

  ngOnInit(): void {
  }
}
