import {model, models, Schema, Types} from "mongoose"

const CategorySchema = new Schema({
    category:{type:String, require:true, unique:true},
    parentCategory : {type: Types.ObjectId, ref: "Category"}
})

const Category = models.Category || model("Category", CategorySchema)

export default Category