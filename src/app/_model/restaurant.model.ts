import { FileHandle } from "./file-handle.model"

export interface Restaurant{
    restaurantId:Number,
    restaurantName: String,
    fssaiLicenseNumber:String,
    panCard:String,
    restaurantAddress: String,
    documents: FileHandle[]
}