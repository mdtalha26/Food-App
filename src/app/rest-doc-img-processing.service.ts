import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './_model/file-handle.model';
import { Restaurant } from './_model/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestDocImgProcessingService {

  constructor(private sanitizer:DomSanitizer) { }

  public createImages(restaurant: Restaurant) {
    const restDocImages: any[] = restaurant.documents;

    const restDocImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < restDocImages.length; i++) {
      const imageFileData = restDocImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

      const finalFileHandle :FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      restDocImagesToFileHandle.push(finalFileHandle);
    }

    restaurant.documents = restDocImagesToFileHandle;
    return restaurant;

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
