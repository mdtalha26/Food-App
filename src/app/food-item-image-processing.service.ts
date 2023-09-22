import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './_model/file-handle.model';
import { FoodItem } from './_model/fooditem.model';

@Injectable({
  providedIn: 'root'
})
export class FoodItemImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }

  public createImages(foodItem: FoodItem) {
    const foodItemImages: any[] = foodItem.foodItemImages;

    const foodItemImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < foodItemImages.length; i++) {
      const imageFileData = foodItemImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

      const finalFileHandle :FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      foodItemImagesToFileHandle.push(finalFileHandle);
    }

    foodItem.foodItemImages = foodItemImagesToFileHandle;
    return foodItem;

  }

  public dataURItoBlob(picBytes, imageType) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType});
    return blob;
  }
}
