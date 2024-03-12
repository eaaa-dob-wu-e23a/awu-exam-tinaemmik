import {Form, useLoaderData} from "@remix-run/react";
import {authenticator} from "~/services/auth.server";
import mongoose from "mongoose";

export async function loader({request, params}) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin",
    });

    const userInfo = await mongoose.models.User.findById(user._id)
    .populate("events");

    return {userInfo};
}

export default function Profile() {
    const { userInfo } = useLoaderData();

    return (
        <div>
            <h1>Profil</h1>
            <p>Velkommen {userInfo.name}</p>
            <p>Her er dine brugerinformationer</p>

            <p>Navn: {userInfo.name}</p>
            <p>email: {userInfo.email}</p>

            <h2>Dine Events</h2>
            <ul>
                {userInfo.events.map((event) => (
                    <li key={event.id}>
                        <a href={`/events/${event.id}`}>{event.title}</a>
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