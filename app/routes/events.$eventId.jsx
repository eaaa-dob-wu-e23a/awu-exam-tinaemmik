import { useLoaderData, params } from "@remix-run/react";
import { mongoose } from "mongoose";

export const loader = async ({ request }) => {
    async ({ params}) => {
        const Event = await mongoose.events.find({ _id: params.eventsId })
        if(!Event) throw new Error("Event not found")

        const data = { Event }
        return data
}};

export default function EventId(){
    const { Event } = useLoaderData();

    return(
        <div>
            <h1>{Event.title}</h1>
            <p>{Event.description}</p>
            <p>{Event.date}</p>
            <p>{Event.image}</p>
        </div>
)};