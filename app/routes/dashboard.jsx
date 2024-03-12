import { json } from "@remix-run/node"
import Nav from "../components/Nav.jsx";
import mongoose from "mongoose";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

//LOADER 
export async function loader({ request }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
});
return { success: true}

//const url = new URL(request.url);
//const q = url.searchParams.get("q") || "";
//const sortBy = url.searchParams.get("sortBy") || "date";

//const sortOptions = {};
//sortOptions[sortBy] = sortBy != "caption" ? -1 : 1;



//const events = await mongoose.models.Event.find();
//return {events};


};

export default function Dashboard() {
    const { events } = useLoaderData();
    console.log(events);
    return(
        <div className="">
            <div id= "header">
            <Nav />
            </div>
            <div className="w-full bg-gray-200">
                <div className="flex w-8/12  bg-gray-200 rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-1/2 py-10 px-8">
                        <h1 className="text-3xl px-10 text-gray-700 font-bold mb-4">Velkommen til Teater events!</h1>
                        <p className="px-10 text-gray-600">Her kan du finde og tilføje events</p>
                    </div>
                    <div className="w-1/2 py-10 px-8">
                        <h1 className="text-3xl text-gray-700 font-bold mb-4">Events</h1>
                        <div className="flex justify-between">
                           
                                <h2 className="text-2xl text-gray-700 font-bold mb-4"></h2>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio nec enim feugiat tincidunt. Nulla facilisi. Proin nec dui vitae purus luctus lacinia. Nulla facilisi. Proin nec dui vitae purus luctus lacinia.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

//<div>
//{events.map((Event) =>(
    //<Link key={Event._id} to={`${Event._id}`}>
    //<h2 className="text-2xl text-gray-700 font-bold mb-4">{Event.title}</h2>
    //<p className="text-gray-600">{Event.description}</p>
//</Link>
//))}