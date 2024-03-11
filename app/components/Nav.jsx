import { NavLink } from "@remix-run/react";

export default function Nav() {
    return(
        <div className="flex w-full h-20 bg-gray-700 px-10 py-7 font-semibold font-sans">
            <h2 className="text-2xl text-gray-200">Teater events</h2>
        <nav className="text-lg text-white items-center justify-center px-40">
        <NavLink to="/events"className="px-10 hover:text-blue-400">Events</NavLink>
            <NavLink to="/profil"className="px-10 hover:text-blue-400">Profil</NavLink>
            <NavLink to="#"className="px-10 hover:text-blue-400">Tilføj Event</NavLink>
        </nav>
        </div>
    )
};