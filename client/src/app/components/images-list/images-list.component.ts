import { ImagesService } from './../../services/images.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css']
})
export class ImagesListComponent implements OnInit {

  images: any[];
  currentPage: number = 1;
  currentQuery;

  constructor(private imageService: ImagesService) { }

  ngOnInit() {
  }

  setImageList(data){
  this.images= data.hits;
  }

  searchImages(query: string, page: number){
    this.currentQuery = query;
    return this.imageService.getImages(query).subscribe(
      data=>this.setImageList(data),
      error => console.log(error),
      () => console.log('operation complete')
    );
  }

  IncrementPage(event){
  this.currentPage = this.currentPage + 1;
  this.searchImages(this.currentQuery, this.currentPage);
  }

  DecrementPage(event){
    event.preventDefault();
    if(this.currentPage > 1){
      this.currentPage = this.currentPage - 1;
    }

    this.searchImages(this.currentQuery, this.currentPage);
  }

}
