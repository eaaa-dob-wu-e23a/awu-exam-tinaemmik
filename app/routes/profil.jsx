import { useLoaderData} from "@remix-run/react";
import { mongoose } from "mongoose";

export const loader = async ({ params }) => {
    async ({ params }) => {
        const User = await mongoose.User.find({ _id: params.UserId })
        if(!User) throw new Error("Event not found")

        const data = { User }
        return data
};
}

export default function Profil(){
    const { User } = useLoaderData();

    return(
        <div>
            <h1>{User.name}</h1>
            <p>{User.city}</p>
            <p>{User.mail}</p>
        </div>
);
};

//await authenticator.logout(request, { redirectTo: "/xxxxx" });