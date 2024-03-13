import {Form, Link, useLoaderData} from "@remix-run/react";
import {authenticator} from "~/services/auth.server";
import mongoose from "mongoose";
import Nav from "~/components/Nav.jsx";

export async function loader({request}) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin",
    });

    const userInfo = await mongoose.models.User.findById(user._id);
    const eventsInfo = await mongoose.models.Event.find({user: user._id});

    return {userInfo, eventsInfo};
}

export default function Profile() {
    const { userInfo, eventsInfo } = useLoaderData();

    return (
        <div>
            <Nav />
            <div className="h-screen py-10 bg-gray-200">
            <h1 className="text-3xl py-10 text-gray-700 font-bold mb-4 text-center">Velkommen <u>{userInfo.name}</u>!</h1>
            
            <div className="flex w-4/12 mx-auto overflow-hidden">
            <div className="space-y-6 text-left">
            <h2 className="text-lg font-medium py-2 text-indigo-600">Her er dine brugerinformationer</h2>
                <p className="text-md font-medium py-2 text-gray-600"><b>Navn:</b> {userInfo.name}</p>
                <p className="text-md font-medium py-2 text-gray-600"><b>Email:</b> {userInfo.email}</p>

                <h2 className="text-lg font-medium py-2 text-indigo-600">Dine Events</h2>
                <ul>
                    {eventsInfo.map((Event) => (
                    <li key={Event.id}>
                        <Link key={Event.id} to={`/events/${Event._id}/`}
                        className="text-gray-600 hover:text-blue-500"><u>{Event.title}</u></Link>
                    </li>
                ))}
            </ul>
            <Form method="post">
                <button className="w-40 bg-red-500 text-white py-2 rounded-md hover:bg-red-300">Logout</button>
            </Form>
            </div>
            </div>
            </div>
        </div>
    );
};

export async function action({ request }) {
    await authenticator.logout(request, { redirectTo: "/signin" });
    console.log("user have now been logged out")
  };