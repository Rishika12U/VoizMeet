import mongoose from "mongoose";
import {Schema} from "mongoose";

const userScheme  = new mongoose.Schema(
    {
        name:{type: String, required: true},
        username:{type: String, required: true, unique: true},
        password:{type: String, required: true},
        token:{type: String}
    }
);

const User = mongoose.model("User", userScheme);

export { User };