import { json, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import mongoose from "mongoose";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { useState } from "react";

export async function loader({ request, params }) {
    await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin",
    });
    
    const event = await mongoose.models.Event.findById(params.eventId)
    .populate("User");
    
    return json({ event});
};

export default function EditEvent(){

    const { event} = useLoaderData();
    const navigation = useNavigation();
    const [image, setImage] = useState(event.image);

    function cancelHandler(){
        navigation(-1);
    };

    return (
        <>
        <h1>Edit Event</h1>
        <Form method="post" id="event-form"> 
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" required defaultValue={event.title}/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" required defaultValue={event.description}/>
            </div>
            <div>
            <label htmlFor="image">Image URL</label>
            <input
                name="image"
                defaultValue={event.image}
                type="url"
                onChange={(e) => setImage(e.target.value)}
                placeholder="Paste an image URL..."
            />

            <label htmlFor="image-preview">Image Preview</label>
            <img
            id="image-preview"
            className="image-preview"
            src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
            alt="Choose"
            onError={(e) => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
            />

            </div>
            <div>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" required defaultValue={event.date.toISOString().split("T")[0]}/>
            </div>
            <div>
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" required defaultValue={event.location}/>
            </div>
            <div>
                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" name="tags" required defaultValue={event.tags}/>
            </div>
            <div>
                <button type="submit">Save</button>
                <button type="button" onClick={cancelHandler}>Cancel</button>
            </div>
        </Form>
        </>
    );
;}
 export async function action({ request, params }) {
    const authUser = await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin",
    });

    // If the user is not the owner of the event, redirect to the event page
    const eventUpdate = await mongoose.models.Event.findById(params.eventId);
    if (eventUpdate.user.toString() !== authUser.id) {
        return redirect("/events/${params.eventId}");
    };

    const formData = await request.formData();
    const event = await Object.fromEntries(formData);

    eventUpdate.title = event.title;
    eventUpdate.image = event.image;
    eventUpdate.description = event.description;
    eventUpdate.date = event.date;
    eventUpdate.location = event.location;
    eventUpdate.tags = event.tags.split(",").map((tag) => tag.trim());
    await eventUpdate.save();

    return redirect(`/events/${params.eventId}`);
}