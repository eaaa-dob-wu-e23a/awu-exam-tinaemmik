import { useLoaderData} from "@remix-run/react";
import { mongoose } from "mongoose";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin",
    });
    console.log(user);
    const userInfo = await mongoose.models.User.findById(User._id).exec();
    return { data: userInfo };
}

export default function Profil(){
    const { User } = useLoaderData();
    console.log(User);

    return(
        <div>
            <h1>{User.name}</h1>
            <p>{User.city}</p>
            <p>{User.mail}</p>
        </div>
);
};

//await authenticator.logout(request, { redirectTo: "/xxxxx" });