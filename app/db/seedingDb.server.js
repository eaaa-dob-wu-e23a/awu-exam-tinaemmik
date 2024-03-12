import mongoose from "mongoose";

export default async function seedDb(){
  const userCount = await mongoose.models.User.countDocuments();
  const eventCount = await mongoose.models.Event.countDocuments();

  if(userCount === 0 || eventCount === 0){
    await insertData();
  }
}

//Create test users
async function insertData() {
  const User = mongoose.models.User;
  const Event = mongoose.models.Event;

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
      user: arne._id,
      tags: ["improv", "teater"]

    },
    {
      title: "Audition til teaterstykke",
      description: "Audition til teaterstykke i Aarhus",
      image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date("2024-10-22"),
      location: "Aarhus",
      user: birgit._id,
      tags: ["audition", "teater"]
    },
    {
      title: "Social teateraften",
      description: "Der er social teateraften i Odense",
      image: "https://images.unsplash.com/photo-1579539760267-b2e78d9d735e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date("2024-07-10"),
      location: "Odense",
      user: carsten._id,
      tags: ["social", "teater"]
    },
    {
      title: "Improv komedie aften",
      description: "Vi laver imporvisationsteater i Aalborg",
      image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: new Date("2024-07-11"),
      location: "Aalborg",
      user: dorthe._id,
      tags: ["improv", "teater"]
    },
    {
    title: "Manglende skuespillere",
    description: "Vi spiller et stykke og mangler skuespillere",
    image: "https://images.unsplash.com/photo-1579539760267-b2e78d9d735e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: new Date("2024-07-10"),
    location: "Odense",
    user: carsten._id,
    tags: ["audition", "teater"]
  }
  ]);
}