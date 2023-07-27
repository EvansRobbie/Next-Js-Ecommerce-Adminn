import {Schema, model, models} from "mongoose" 

const ProductSchema = new Schema({
    title:{type:String, required:true},
    desc:{type:String, required:true},
    price:{type:String, required:true},
})

const Product = models.Product || model("Product", ProductSchema)

export default Product