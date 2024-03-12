import {json} from "@remix-run/node";
import {authenticator} from "~/services/auth.server";
import { Form, useLoaderData} from "@remix-run/react";
import mongoose from "mongoose";

export async function loader({request, params}) {

    const authUser = await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin",
    });

    const event = await mongoose.models.Event.findById(params.eventId).populate("User");

    return json({event, authUser});
}

export default function Event() { 
    const {event, authUser} = useLoaderData();

    function deleteEvent(e){
        
        const confirmed = confirm("Are you sure you want to delete this event?");
        if(!confirmed){
            e.preventDefault();
        }
    }

    return (
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <p>{event.user.name}</p>
            <p>{event.tags}</p>
            {authUser && event.id === event.User.id && (
                <Form method="post" action="destroy" onSubmit={deleteEvent}>
                    <button type="submit">Delete</button>
                </Form>
            )}
        </div>
    );
}