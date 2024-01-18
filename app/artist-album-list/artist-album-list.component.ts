import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-artist-album-list',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './artist-album-list.component.html',
  styleUrl: './artist-album-list.component.css'
})
export class ArtistAlbumListComponent {
  private albums: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.parent?.params.subscribe(params => {
      this.http
        .jsonp(
          `https://itunes.apple.com/lookup?id=${
            params["artistId"]
          }&entity=album`,
          "callback"
        )
        .toPromise()
        .then((res :any)=> {
          console.log(res);
          this.albums = res.results.slice(1);
        });
    });
  }
}