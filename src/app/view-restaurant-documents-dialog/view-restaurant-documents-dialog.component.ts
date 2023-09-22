import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { FileHandle } from '../_model/file-handle.model';

@Component({
  selector: 'app-view-restaurant-documents-dialog',
  templateUrl: './view-restaurant-documents-dialog.component.html',
  styleUrls: ['./view-restaurant-documents-dialog.component.css']
})
export class ViewRestaurantDocumentsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);
  }

}
