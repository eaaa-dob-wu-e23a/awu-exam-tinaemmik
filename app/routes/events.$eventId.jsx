import {json} from "@remix-run/node";
import {authenticator} from "~/services/auth.server";
import { Form, useLoaderData} from "@remix-run/react";
import mongoose from "mongoose";
import Nav from "~/components/Nav.jsx";

export async function loader({request, params}) {

    const authUser = await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin",
    });

    const Event = await mongoose.models.Event.findById(params.eventId);


    return json({Event, authUser});
}

export default function Event() { 
    const { Event, authUser } = useLoaderData();

    function deleteEvent(e){
        
        const confirmed = confirm("Are you sure you want to delete this event?");
        if(!confirmed){
            e.preventDefault();
        }
    }

    return (
        <div>
            <Nav />
            <div className="h-full py-10 bg-gray-200">
            <h1 className="text-3xl py-10 text-gray-700 font-bold mb-4 text-center">{Event.title}</h1>
            <div className="flex w-4/12 mx-auto overflow-hidden">
            <div className="space-y-6 text-left content-center">
            <img src={Event.image} alt={Event.title}
            className="w-96 rounded-md shadow-lg" />
            <p className="text-md font-medium py-2 text-gray-600"><b>dato:</b> {Event.date}</p>
            <p className="text-md font-medium py-2 text-gray-600"><b>Location:</b> {Event.location}</p>
            <p className="text-md font-medium py-2 text-gray-600"><b>Beskrivelse:</b> {Event.description}</p>
            <p className="text-md font-medium py-2 text-gray-600">{Event.tags}</p>
            {authUser && Event.id === Event.user._id && (
                <Form method="post" action="destroy" onSubmit={deleteEvent}
                className="w-40 text-center bg-red-500 text-white py-2 rounded-md hover:bg-red-300">
                    <button type="submit">Delete</button>
                </Form>
            )}
            </div>
            </div>
            </div>
        </div>
    );
}