import mongoose from "mongoose";

//create a response schema
const responseSchema = new mongoose.Schema({
    res: String
},{timestamps: true})

const Ans = mongoose.model("Response", responseSchema);

export default Ans;