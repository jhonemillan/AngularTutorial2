import { ImagesService } from './../../services/images.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css']
})
export class ImagesListComponent implements OnInit {

  images: any[];

  constructor(private imageService: ImagesService) { }

  ngOnInit() {
  }

  setImageList(data){
  this.images= data.hits;
  }

  searchImages(query: string){
    return this.imageService.getImages(query).subscribe(
      data=>this.setImageList(data),
      error => console.log(error),
      () => console.log('operation complete')
    );
  }

}
