import { mongoose } from "mongoose";

const { Schema } = mongoose;

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
    }
  },
  {timestamps: true }
);


//Create test users
async function insertData() {
  const User = mongoose.model("User", userSchema);
  const Event = mongoose.model("Event", eventSchema);

  console.log("Dropping user and event collection...");
  await User.collection.drop();
  await Event.collection.drop();

  console.log("Creating test users...");

  const arne = await User.create({
    name: "Arne Jensen",
    city: "København",
    email: "arne.jensen@arne.dk",
    password: "1234"
  });

  const birgit = await User.create({
    name: "Birgit Hansen",
    city: "Aarhus",
    email: "birgit.hansen@birgit.dk",
    password: "1234"
  });

  const carsten = await User.create({
    name: "Carsten Nielsen",
    city: "Odense",
    email: "carsten.nielsen@carsten.dk",
    password: "1234"
  });

  const dorthe = await User.create({
    name: "Dorthe Madsen",
    city: "Aalborg",
    email: "Dorthe.madsen@dorthe.dk",
    password: "1234"
  });

  await Event.insertMany([
    {
      title: "Improv Aften",
      description: "Vi mødes og laver improvisationsteater",
      image: "https://images.unsplash.com/photo-1579539760267-b2e78d9d735e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date("2024-07-08"),
      location: "København",
      user: arne._id
    },
    {
      title: "Audition til teaterstykke",
      description: "Audition til teaterstykke i Aarhus",
      image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date("2024-10-22"),
      location: "Aarhus",
      user: birgit._id
    },
    {
      title: "Kajak tur",
      description: "Vi mødes og tager på kajaktur",
      image: "https://images.unsplash.com/photo-1579539760267-b2e78d9d735e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date("2024-07-10"),
      location: "Odense",
      user: carsten._id
    },
    {
      title: "Bordtennis turnering",
      description: "Vi mødes og spiller bordtennis",
      image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date("2024-07-11"),
      location: "Aalborg",
      user: dorthe._id
    }
  ]);
}
const entrySchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["work", "learning", "interesting-thing"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  // Automatically add `createdAt` and `updatedAt` timestamps:
  // https://mongoosejs.com/docs/timestamps.html
  { timestamps: true },
);

// For each model you want to create, please define the model's name, the
// associated schema (defined above), and the name of the associated collection
// in the database (which will be created automatically).
export const models = [
  {
    name: "Entry",
    schema: entrySchema,
    collection: "entries",
  },
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