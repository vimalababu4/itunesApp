import { Component, Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router,RouterOutlet, CanActivate, CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot, CanDeactivate } from "@angular/router"
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ArtistAlbumListComponent } from './artist-album-list/artist-album-list.component';
import { ArtistComponent } from './artist/artist.component';
import { ArtistTracklistComponent } from './artist-tracklist/artist-tracklist.component';





 class SearchItem {
  constructor(
    public name: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string
  ) {}
}

@Injectable()
export class SearchService {
  apiRoot: string = "https://itunes.apple.com/search";
  results: SearchItem[];

  constructor(private http: HttpClient) {
    this.results = [];
  }

  search(term: string) {
    return new Promise<void>((resolve, reject) => {
      this.results = [];
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
      this.http
        .jsonp(apiURL, "callback")
        .toPromise()
        .then(
          (res:any)=> {
            // Success
            this.results = res.results.map((item:any) => {
              return new SearchItem(
                item.trackName,
                item.artistName,
                item.trackViewUrl,
                item.artworkUrl30,
                item.artistId
              );
            });
            resolve();
          },
          msg => {
            // Error
            reject(msg);
          }
        );
    });
  }
} 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule,ReactiveFormsModule, HttpClientJsonpModule,
    HttpClientModule, HomeComponent, SearchComponent, HeaderComponent,
    ArtistComponent, ArtistAlbumListComponent, ArtistTracklistComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:  [SearchService] 
})

export class AppComponent {
  title = 'my-app';
}

//Router Guards
/* class AlwaysAuthGuard implements CanActivate {
  canActivate() {
    console.log("AlwaysAuthGuard");
    return true;
  }
}

class UserService {
  isLoggedIn(): boolean {
    return false;
  }
}
 @Injectable()
class OnlyLoggedInUsersGuard implements CanActivate {
  
  constructor(private userService: UserService, private router: Router) {}; 

  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (this.userService.isLoggedIn()) { 
      return true;
    } else {
      //window.alert("You don't have permission to view this page"); 
      //return false;
      this.router.navigate([""]);
      return false;
    }
  }
}  
class AlwaysAuthChildrenGuard implements CanActivateChild {
  canActivateChild() {
    console.log("AlwaysAuthChildrenGuard");
    return true;
  }
}

class UnsearchedTermGuard implements CanDeactivate<SearchComponent> { 
  canDeactivate(component: SearchComponent, 
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
    console.log("UnsearchedTermGuard");
    console.log(route.params);
    console.log(state.url);
    return component.canDeactivate() || window.confirm("Are you sure?");
  }
} */

const routes:Routes = [
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'find', redirectTo: 'search'}, 
	{path: 'home', component: HomeComponent},
	{path: 'search/:term', component: SearchComponent},
  {path: 'search', component: SearchComponent},
  {
    path: 'artist/:artistId',
    component: ArtistComponent,
   // canActivate: [OnlyLoggedInUsersGuard,AlwaysAuthGuard],
   // canActivateChild: [AlwaysAuthChildrenGuard],
    children: [
      {path: '', redirectTo: 'tracks', pathMatch: 'full'}, 
      {path: 'tracks', component: ArtistTracklistComponent},
      {path: 'albums', component: ArtistAlbumListComponent}, 
    ]
  },
  {path: '**', component: HomeComponent}
];



@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [],
  bootstrap: [AppComponent],
  providers: [SearchService]//,OnlyLoggedInUsersGuard,AlwaysAuthGuard, UserService,AlwaysAuthChildrenGuard]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule); 
