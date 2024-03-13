import {Form, useLoaderData} from "@remix-run/react";
import {authenticator} from "~/services/auth.server";
import mongoose from "mongoose";

export async function loader({request}) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin",
    });

    const userInfo = await mongoose.models.User.findById(user._id);
    const eventsInfo = await mongoose.models.Event.findById(user._id);

    user._id = Event.user;


    return {userInfo, eventsInfo};
}

export default function Profile() {
    const { userInfo, eventsInfo } = useLoaderData();

    return (
        <div>
            <h1>Profil</h1>
            <p>Velkommen {userInfo.name}</p>
            <p>Her er dine brugerinformationer</p>

            <p>Navn: {userInfo.name}</p>
            <p>email: {userInfo.email}</p>

            <h2>Dine Events</h2>
            <ul>
                {Object.eventsInfo.map((Event) => (
                    <li key={eventsInfo.id}>
                        <a href={`/events/${Event.id}`}>{eventsInfo.title}</a>
                    </li>
                ))}
            </ul>
            <Form method="post">
                <button>Logout</button>
            </Form>
        </div>
    );
};

export async function action({ request }) {
    await authenticator.logout(request, { redirectTo: "/signin" });
    console.log("user have now been logged out")
  };