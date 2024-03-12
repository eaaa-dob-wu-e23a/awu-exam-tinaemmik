import Nav from "../components/Nav.jsx";
import { Link, Form, useLoaderData, useSubmit } from "@remix-run/react";
import { json } from "@remix-run/node";
import mongoose from "mongoose";
import { authenticator } from "~/services/auth.server";

//LOADER 
export async function loader({ request }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
});
return { success: true}

    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const sortBy = url.searchParams.get("sort-by") || "date";
    const filterTags = url.searchParams.get("tag") || "";

    const sortOptions = {};
    sortOptions[sortBy] = sortBy != "title" ? -1 : 1;

    const query = { title: { $regex: q, $options: "i" } };
    if (filterTags) {
        query.tags = filterTags;
    }

    const events = await mongoose.models.Event.find(query)
    .sort(sortOptions)
    .populate("User");

    const specialTags = await mongoose.models.Event.aggregate([
        { $unwind: "$tags" },
        { $group: { _id: "$tags"} },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, tag: "$_id" } },
    ]);

    const tags = specialTags.map((tagDoc) => tagDoc.tag);

    return json({
        events,
        tags,
        q,
        sortBy,
        filterTags,
    });
};

export default function Dashboard() {
    const { events, tags, q, sortBy, filterTags } = useLoaderData();
    const submit = useSubmit();
    
    function handleFilterSubmit(e) {
        const isFirstSearch = q === null;
        submit(e.currentTarget, {
            replace: !isFirstSearch,
        });
    };

    return(
        <>
            <div id= "header">
            <Nav />
            </div>
            <div id="search" className="flex justify-center">
                <Form id="search-field"
                role="search"
                onChange={handleFilterSubmit}
                className="flex space-x-4">
                    <label>
                        Search by title {""}
                        <input
                            aria-label="Search by title"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            className="border-gray-400 rounded-md"
                        />
                    </label>
                    <label>
                        Filter by tags {""}
                        <select
                            name="tag"
                            defaultValue={filterTags}
                            className="border-gray-400 rounded-md">
                            <option value="">All</option>
                            {tags.map((tag) => (
                                <option key={tag} value={tag}>
                                    {tag}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Sort by {""}
                        <select
                            name="sort-by"
                            defaultValue={sortBy}
                            className="border-gray-400 rounded-md">
                            <option value="date">Date</option>
                            <option value="title">Title</option>
                        </select>
                    </label>

                </Form>
            </div>
            <div id="events" className="flex flex-wrap justify-center">
                {events.map((event) => (
                    <div key={event._id} className="event-card">
                        <Link to={`/event/${event._id}`}>
                            <img src={event.image} alt={event.title} />
                            <h2>{event.title}</h2>
                            <p>{event.date.toDateString()}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};
