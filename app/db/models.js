import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";

//User Schema

const userSchema = new mongoose.Schema(
  {
    name: String,
    city: String,
    email:{
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type: String,
      required: true,
      select: false
    }
    },
    {timestamps: true }
);

// pre save password hook
userSchema.pre("save", async function (next) {
  const User = this; // this refers to the user document

  // only hash the password if it has been modified (or is new)
  if (!User.isModified("password")) {
    return next(); // continue
  }

  const salt = await bcrypt.genSalt(10); // generate a salt
  User.password = await bcrypt.hash(User.password, salt); // hash the password
  next(); // continue
});

//Event Schema

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    date: Date,
    location: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    tags : [String]
  },
  {timestamps: true }
);

// For each model you want to create, please define the model's name, the
// associated schema (defined above), and the name of the associated collection
// in the database (which will be created automatically).
export const models = [
  {
    name: "User",
    schema: userSchema,
    collection: "users",
  },
  {
    name: "Event",
    schema: eventSchema,
    collection: "events",
  },
];

