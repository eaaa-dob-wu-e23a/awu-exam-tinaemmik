import { redirect } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import  mongoose  from "mongoose";
import { authenticator } from "~/services/auth.server";
//import { useState } from "react";

export function meta() {
    return {
        title: "Add Event",
        description: "Add an new event",
    };
};

export function loader({ request }) {
    return authenticator.isAuthenticated(request, {
        redirectTo: "/signin",
    });
};

export default function AddEvent(){
    const navigate = useNavigate();

    function cancelHandler(){
        navigate(-1);
    }

    return(
        <div>
        <h1>Add new event</h1>
        <Form method="post">
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" />
            </div>
            <div>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" />
            </div>
            <div>
                <label htmlFor="image">Image</label>
                <input type="text" id="image" name="image" />
            </div>
            <div>
                <button type="submit">Add Event</button>
                <button type="button" onClick={cancelHandler}>Cancel</button>
            </div>
        </Form>
        </div>
    )
};

export async function action({ request }) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin",
      });
      console.log(user);

      const formData = await request.formData();
      const event = Object.fromEntries(formData);
        event.user = user._id;
        await mongoose.models.Event.create(event);
    return redirect("/events");
}