import {Schema, model, models, Types} from "mongoose" 

const ProductSchema = new Schema({
    title:{type:String, required:true},
    category:{type:Types.ObjectId, ref:'Categories'},
    desc:{type:String, required:true},
    price:{type:String, required:true},
    image:{type:[String]},
    properties:{type:Object}
},
{
    timestamps:true,
}
)

const Product = models.Product || model("Product", ProductSchema)

export default Product