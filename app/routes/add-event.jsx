import { redirect } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import mongoose from "mongoose";
import { authenticator } from "~/services/auth.server";
import { useState } from "react";
import Nav from "~/components/Nav.jsx";

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
        <Nav />
        <div className="py-10 bg-gray-200" >
        <h1 className="text-3xl py-10 text-gray-700 font-bold mb-4 text-center">Add Event</h1>
        <div className="flex w-4/12 rounded-xl mx-auto overflow-hidden">
        <Form method="post" id="event-form" className="space-y-6 ">
            <div>
                <label htmlFor="title"className="block text-md font-medium py-2 text-gray-600">Title</label>
                <input 
                type="text" 
                id="title" 
                name="title" 
                required 
                className="mt-1 block w-50 h-8 rounded-sm border-gray-400 shadow-md" />
            </div>
            <div>
                <label htmlFor="description"className="block text-md py-2 font-medium text-gray-600">Description</label>
                <textarea 
                id="description" 
                name="description"
                placeholder="Write a description..."
                className="mt-1 block w-50 h-30 rounded-sm border-gray-400 shadow-md" 
                required />
            </div>
            <div>
                <label htmlFor="image" className="block text-md py-2 font-medium text-gray-600">Image URL</label>
                <input
                    name="image"
                    type="url"
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Paste an image URL..."
                    className="mt-1 block w-50 h-8 rounded-sm border-gray-400 shadow-md" 
                />
                <label htmlFor="image-preview" className="block text-md py-2 font-medium text-gray-600">Image Preview</label>
                <img
                    id="image-preview"
                    src={image}
                    alt="Choose"
                    onError={(e) => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
                    className="mt-1 block h-60 rounded-sm border-gray-400 shadow-md" 
                />
            </div>
            <div>
                <label htmlFor="date" className="block text-md py-2 font-medium text-gray-600">Date</label>
                <input 
                type="date" 
                id="date" 
                name="date" 
                className="mt-1 block w-50 h-8 rounded-sm border-gray-400 shadow-md" 
                required />
            </div>
            <div>
                <label htmlFor="location" className="block text-md py-2 font-medium text-gray-600">Location</label>
                <input type="text" 
                id="location"
                name="location" 
                className="mt-1 block w-50 h-8 rounded-sm border-gray-400 shadow-md" 
                required />
            </div>
            <div>
                <label htmlFor="tags"className="block text-md py-2 font-medium text-gray-600">Tags</label>
                <input type="text"
                 id="tags"
                name="tags"
                className="mt-1 block w-50 h-8 rounded-sm border-gray-400 shadow-md"/>
            </div>
            <div className="flex justify-center space-x-6">
            <button type="submit"
            className="w-40 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-300">Add Event</button>
            <button type="button"
            className="w-40 bg-red-500 text-white py-2 rounded-md hover:bg-red-300"
            onClick={cancelHandler}>Cancel</button>
            </div>
        </Form>
        </div>
        </div>
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