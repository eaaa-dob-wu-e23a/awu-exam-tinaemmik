import Nav from "../components/Nav.jsx";
import { Link, Form, useLoaderData, useSubmit } from "@remix-run/react";
//import { json } from "@remix-run/node";
import mongoose from "mongoose";
import { authenticator } from "~/services/auth.server";

//LOADER 
export async function loader({ request }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
});

const eventsInfo = await mongoose.models.Event.find({Event: Event._id});

return {eventsInfo};

    //const url = new URL(request.url);
    //const q = url.searchParams.get("q") || "";
    //const sortBy = url.searchParams.get("sort-by") || "date";
    //const filterTags = url.searchParams.get("tag") || "";

    //const sortOptions = {};
    //sortOptions[sortBy] = sortBy != "title" ? -1 : 1;

    //const query = { title: { $regex: q, $options: "i" } };
    //if (filterTags) {
        //query.tags = filterTags;
    //}

    //const events = await mongoose.models.Event.find(query)
    //.sort(sortOptions)
    //.populate("user");

    //const specialTags = await mongoose.models.Event.aggregate([
        //{ $unwind: "$tags" },
        //{ $group: { _id: "$tags"} },
        //{ $sort: { _id: 1 } },
        //{ $project: { _id: 0, tag: "$_id" } },
    //]);

    //const tags = specialTags.map((tagDoc) => tagDoc.tag);

    //return json ({
        //events,
        //tags,
        //q,
        //sortBy,
        //filterTags,
    //});
};

export default function Dashboard() {
    const { eventsInfo } = useLoaderData();
    //const submit = useSubmit();
    
    //function handleFilterSubmit(e) {
        //const isFirstSearch = q === null;
        //submit(e.currentTarget, {
            //replace: !isFirstSearch,
        //});
    //};

    return(
        <>
            <div id= "header">
            <Nav />
            </div>
            <div className="h-full py-10 bg-gray-200 overflow:hidden">
            <h1 className="text-center text-3xl text-gray-700 p-10 font-bold mb-4">Eventsoversigt</h1>
            <div id="events" className="grid grid-rows-3 justify-center">
                <div className="w-60">
                    {eventsInfo.map((Event) => (
                        <div key={Event._id} className="event-card">
                            <Link key={Event.id} to={`/events/${Event._id}/`}>
                                <h2 className="text-2xl text-gray-700 font-bold mb-4">{Event.title}</h2>
                                <img src={Event.image} alt={Event.title} />
                                <p>{Event.date}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </>
    );
};
