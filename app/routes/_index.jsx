import { json } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import mongoose from "mongoose";


//export async function loader() {
  //const entries = await mongoose.models.Entry.find({});
  //return json({ entries });
//}

export default function Index() {

  return redirect ("/signin");
}
