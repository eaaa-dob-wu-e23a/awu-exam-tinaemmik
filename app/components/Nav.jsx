import { NavLink } from "@remix-run/react";

export default function Nav() {
    return(
        <nav className="w-full h-20 bg-gray-700 text-white text-lg px-10 py-8 font-semibold font-sans">
            <NavLink to="/dashboard" className="px-10 hover:text-blue-400">Dashboard</NavLink>
            <NavLink to="/profil"className="px-10 hover:text-blue-400">Profil</NavLink>
            <NavLink to="/events"className="px-10 hover:text-blue-400">Events</NavLink>
            <NavLink to="#"className="px-10 hover:text-blue-400">Tilføj Event</NavLink>
        </nav>
    )
};