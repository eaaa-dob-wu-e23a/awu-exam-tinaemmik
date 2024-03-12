import { redirect } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import mongoose from "mongoose";
import { authenticator } from "~/services/auth.server";
import { useState } from "react";

export async function loader({ request }) {
    return await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });
};

export default function AddEvent() {
    const [image, setImage] = useState("https://placehold.co/600x400?text=Add+your+amazing+image");
    const navigation = useNavigate();

    function cancelHandler(){
        navigation(-1);
    };

    return (
        <>
        <h1>Add Event</h1>
        <Form method="post" id="event-form">
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" required />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" required />
            </div>
            <div>
                <label htmlFor="image">Image URL</label>
                <input
                    name="image"
                    type="url"
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Paste an image URL..."
                />
                <label htmlFor="image-preview">Image Preview</label>
                <img
                    id="image-preview"
                    className="image-preview"
                    src={image}
                    alt="Choose"
                    onError={(e) => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
                />
            </div>
            <div>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" required />
            </div>
            <div>
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" required />
            </div>
            <div>
                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" name="tags" />
            </div>
            <button type="submit">Add Event</button>
            <button type="button" onClick={cancelHandler}>Cancel</button>
        </Form>
        </>
    );

}

export async function action({ request }) {

    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin",
    });
    console.log(user);

    const formData = await request.formData();
    const event = Object.fromEntries(formData);
    event.tags = event.tags.split(",");

    event.user = user._id;
    await mongoose.models.Event.create(event);

    return redirect("/events");
}