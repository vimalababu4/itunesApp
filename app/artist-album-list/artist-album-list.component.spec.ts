import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAlbumListComponent } from './artist-album-list.component';

describe('ArtistAlbumListComponent', () => {
  let component: ArtistAlbumListComponent;
  let fixture: ComponentFixture<ArtistAlbumListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistAlbumListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistAlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
