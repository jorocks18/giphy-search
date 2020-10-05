import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GifService } from '../services/gif.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  hasUserSearched = false;
  images = [];
  @ViewChild('searchInput') searchField: ElementRef;

  constructor(private gif: GifService) { }

  ngOnInit(){
    if(!this.hasUserSearched){
      this.defaultGIF();
    }
  }

  searchGIF(){
    this.hasUserSearched = true;
    this.gif.fetchGIF(this.searchField.nativeElement.value).subscribe((res: any) => {
      this.images = res.data;
    });
  }

  defaultGIF(){
    this.gif.defaultGIF().subscribe((res: any) => {
      this.images = res.data;
    });
  }
}
