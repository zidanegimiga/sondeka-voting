import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    name: { 
      type: String 
    },
    image: { 
      type: String 
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(autopopulate);

const UserModel = mongoose.model("User", userSchema);
export default  UserModel