import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SearchService } from '../app.component';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,SearchComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})


export class SearchComponent{
   loading: boolean = false;

  constructor(
    public itunes: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params["term"]) {
        this.doSearch(params["term"]);
      }
    });
  }

  doSearch(term: string) {
    this.loading = true;
    this.itunes.search(term).then(_ => (this.loading = false));
  }

  onSearch(term: string) {
    this.router.navigate(["search", { term: term }]);
  }
  canDeactivate() {
    return this.itunes.results.length > 0;
  }
}
