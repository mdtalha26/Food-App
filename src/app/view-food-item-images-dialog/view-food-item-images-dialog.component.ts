import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-food-item-images-dialog',
  templateUrl: './view-food-item-images-dialog.component.html',
  styleUrls: ['./view-food-item-images-dialog.component.css']
})
export class ViewFoodItemImagesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);
  }

}
