import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTracklistComponent } from './artist-tracklist.component';

describe('ArtistTracklistComponent', () => {
  let component: ArtistTracklistComponent;
  let fixture: ComponentFixture<ArtistTracklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistTracklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistTracklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
