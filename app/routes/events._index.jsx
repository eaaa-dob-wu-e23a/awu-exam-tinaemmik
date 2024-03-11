import mongoose from "mongoose";
import { useLoaderData, Link } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
//import { format, startOfWeek } from "date-fns";

export function meta() {
  return {
    title: "Events",
    description: "Find and add events in your area",
  };
};

// LOADER 
export async function loader({ request }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });
};
//export default function action(){

//};

export default function Events() {
    //const { Event } = useLoaderData();

    //const eventsByWeek = events.reduce((acc, entry) => {
      //const weekStart = format(startOfWeek(new Date(event.date)), 'yyyy-MM-dd');
      //if (!acc[weekStart]) {
        //acc[weekStart] = [];
      //}
      //acc[weekStart].push(event);
      //return acc;
    //}, {});
  
    return(
        <div className="min h-screen py-40 bg-gray-200">
            <h1 className="text-3xl text-gray-700 font-bold mb-4 font-sans">Events</h1>
            <link to ="/NewEvent" className="text-white">Tilføj Event</link>

        </div>
    )
};

//{Object.events(eventsByWeek).map(([weekStart, events]) => (
    //<div className="mt-4 border border-gray-200 bg-gray-700 p-4 text-center" key={weekStart}>
    //<h2 className="mt-4 text-xl font-semibold text-white">Week of {weekStart}</h2>
      //{entries.map(entry => (
        //<div className="text-white" key={event._id}>
          //<p>{event.title}</p>
          //<p>{event.image}</p>
          //<p>{event.date}</p>
        //</div>
        //))}