import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchService } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artist-tracklist',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './artist-tracklist.component.html',
  styleUrl: './artist-tracklist.component.css'
})
export class ArtistTracklistComponent {
  private tracks: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.parent?.params.subscribe(params => {
      this.http
        .jsonp(
          `https://itunes.apple.com/lookup?id=${
            params["artistId"]
          }&entity=song`,
          "callback"
        )
        .toPromise()
        .then((res:any)=> {
          // Success
          this.tracks = res.results.slice(1);
        });
    });
  }
  }

