import { FileHandle } from "./file-handle.model"

export interface FoodItem{
    foodItemId:number,
    foodItemName: String,
    foodItemDescription: String,
    foodItemCategory:String,
    foodItemPrice:number,
    foodItemImages: FileHandle[]
}